import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { isProviderId } from "@plata-neta/providers";
import { entriesForPayoutSent } from "@plata-neta/core";
import { authenticateApiKey } from "@/lib/apikey";
import { rateLimit, rateLimitKey } from "@/lib/ratelimit";

const APPROVAL_THRESHOLD = BigInt(process.env.PAYOUT_APPROVAL_THRESHOLD ?? "10000000"); // $100k ARS default

// GET /api/v1/payouts — listar.
export async function GET(req: NextRequest) {
  const auth = await authenticateApiKey(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const payouts = await prisma.payout.findMany({
    where: {
      tenantId: auth.tenantId,
      ...(status ? { status: status as never } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: Math.min(Number(url.searchParams.get("limit")) || 50, 200),
  });
  return NextResponse.json({ payouts });
}

// POST /api/v1/payouts — crear payout. Sobre umbral → requiere aprobación 2 pasos.
export async function POST(req: NextRequest) {
  const rl = await rateLimit(rateLimitKey(req, "payouts"), 30);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate limited" }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });
  }
  const auth = await authenticateApiKey(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const tenantId = auth.tenantId;

  let body: {
    provider?: string;
    payeeRef?: string;
    amountCents?: number | string;
    currency?: string;
    idempotencyKey?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { provider = "mercadopago", payeeRef, amountCents, currency = "ARS", idempotencyKey } = body;
  if (!payeeRef || !idempotencyKey || amountCents == null) {
    return NextResponse.json({ error: "required: payeeRef, amountCents, idempotencyKey" }, { status: 400 });
  }
  if (!isProviderId(provider)) {
    return NextResponse.json({ error: `unknown provider: ${provider}` }, { status: 400 });
  }
  const amount = BigInt(amountCents);
  if (amount <= 0n) {
    return NextResponse.json({ error: "amountCents must be > 0" }, { status: 400 });
  }

  const existing = await prisma.payout.findUnique({
    where: { tenantId_idempotencyKey: { tenantId, idempotencyKey } },
  });
  if (existing) {
    return NextResponse.json({ payout: existing, duplicated: true });
  }

  const needsApproval = amount >= APPROVAL_THRESHOLD;
  const payout = await prisma.payout.create({
    data: {
      tenantId,
      provider,
      payeeRef,
      amountCents: amount,
      currency,
      idempotencyKey,
      status: needsApproval ? "PENDING" : "PROCESSING",
    },
  });

  return NextResponse.json(
    { payout, requiresApproval: needsApproval },
    { status: 201 },
  );
}
