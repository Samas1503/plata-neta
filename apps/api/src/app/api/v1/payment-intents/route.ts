import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { getProvider, isProviderId } from "@plata-neta/providers";
import {
  assertTransition,
  canTransition,
  entriesForCollectionPending,
} from "@plata-neta/core";
import { authenticateApiKey } from "@/lib/apikey";
import { decryptJson } from "@plata-neta/db";
import { ensureProvidersRegistered, toCredentials } from "@/lib/providers";
import { rateLimit, rateLimitKey } from "@/lib/ratelimit";

// GET /api/v1/payment-intents — listar intents del tenant autenticado.
export async function GET(req: NextRequest) {
  const auth = await authenticateApiKey(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const provider = url.searchParams.get("provider");
  const take = Math.min(Number(url.searchParams.get("limit")) || 50, 200);

  const intents = await prisma.paymentIntent.findMany({
    where: {
      tenantId: auth.tenantId,
      ...(status ? { status: status as never } : {}),
      ...(provider ? { provider } : {}),
    },
    orderBy: { createdAt: "desc" },
    take,
  });
  return NextResponse.json({ intents });
}

// POST /api/v1/payment-intents — crear intent de cobro.
// Idempotencia estricta por (tenantId, idempotencyKey) — RULES.MD §1.

interface CreateBody {
  provider?: string;
  amountCents?: number | string;
  currency?: string;
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  ensureProvidersRegistered();

  const rl = await rateLimit(rateLimitKey(req, "intents"), 60);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  const auth = await authenticateApiKey(req);
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const tenantId = auth.tenantId;

  let body: CreateBody;
  try {
    body = (await req.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { provider = "mercadopago", amountCents, currency = "ARS", idempotencyKey, metadata } = body;
  if (!idempotencyKey || amountCents == null) {
    return NextResponse.json(
      { error: "required: idempotencyKey, amountCents" },
      { status: 400 },
    );
  }
  if (!isProviderId(provider)) {
    return NextResponse.json({ error: `unknown provider: ${provider}` }, { status: 400 });
  }

  const amount = BigInt(amountCents);
  if (amount <= 0n) {
    return NextResponse.json({ error: "amountCents must be > 0" }, { status: 400 });
  }

  // Idempotencia: misma key → mismo intent, nunca duplica.
  const existing = await prisma.paymentIntent.findUnique({
    where: { tenantId_idempotencyKey: { tenantId, idempotencyKey } },
  });
  if (existing) {
    return NextResponse.json({ intent: existing, duplicated: true });
  }

  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) {
    return NextResponse.json({ error: "tenant not found" }, { status: 404 });
  }

  const credential = await prisma.pspCredential.findUnique({
    where: { tenantId_provider: { tenantId, provider } },
  });
  if (!credential) {
    return NextResponse.json(
      { error: `tenant has no credentials for ${provider}` },
      { status: 422 },
    );
  }

  // Intent PENDING + asientos ledger en la misma transacción.
  const intent = await prisma.$transaction(async (tx) => {
    const created = await tx.paymentIntent.create({
      data: {
        tenantId,
        provider,
        amountCents: amount,
        currency,
        idempotencyKey,
        metadata: (metadata ?? {}) as never,
      },
    });
    for (const e of entriesForCollectionPending(created.id, amount)) {
      await tx.ledgerEntry.create({
        data: { tenantId, account: e.account, debitCents: e.debitCents, creditCents: e.creditCents, refType: e.refType, refId: e.refId },
      });
    }
    return created;
  });

  // Llamada al PSP con credenciales del comercio.
  try {
    const result = await getProvider(provider).createIntent(
      { tenantId, idempotencyKey, amountCents: amount, currency: currency as never, metadata },
      toCredentials(decryptJson(credential.encryptedKeys)),
    );

    if (canTransition(intent.status as never, result.status as never)) {
      assertTransition(intent.status as never, result.status as never);
    }
    const updated = await prisma.paymentIntent.update({
      where: { id: intent.id },
      data: {
        externalRef: result.externalRef,
        status: result.status,
        metadata: {
          ...(metadata ?? {}),
          paymentDetails: result.paymentDetails,
        } as never,
      },
    });
    return NextResponse.json({ intent: updated }, { status: 201 });
  } catch (err) {
    // Fallo upstream: PENDING -> FAILED (transición válida) + marcar.
    await prisma.paymentIntent.update({
      where: { id: intent.id },
      data: { status: "FAILED" },
    });
    const message = err instanceof Error ? err.message : "provider error";
    return NextResponse.json({ error: message, intentId: intent.id }, { status: 502 });
  }
}
