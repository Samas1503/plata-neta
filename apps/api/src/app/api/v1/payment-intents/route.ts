import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { getProvider, isProviderId } from "@plata-neta/providers";
import {
  assertTransition,
  canTransition,
  entriesForCollectionPending,
} from "@plata-neta/core";
import { decryptJson } from "@/lib/crypto";
import { ensureProvidersRegistered, toCredentials } from "@/lib/providers";

// POST /api/v1/payment-intents — crear intent de cobro.
// Idempotencia estricta por (tenantId, idempotencyKey) — RULES.MD §1.

interface CreateBody {
  tenantId?: string;
  provider?: string;
  amountCents?: number | string;
  currency?: string;
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  ensureProvidersRegistered();

  let body: CreateBody;
  try {
    body = (await req.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { tenantId, provider = "mercadopago", amountCents, currency = "ARS", idempotencyKey, metadata } = body;
  if (!tenantId || !idempotencyKey || amountCents == null) {
    return NextResponse.json(
      { error: "required: tenantId, idempotencyKey, amountCents" },
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
