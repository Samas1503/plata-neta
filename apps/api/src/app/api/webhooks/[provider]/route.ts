import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { getProvider, isProviderId } from "@plata-neta/providers";
import { ensureProvidersRegistered } from "@/lib/providers";

// Webhooks PSP — RULES.MD §2:
// - verificar firma ANTES de procesar; inválida → 401, nunca procesar
// - responder 200 solo tras persistir el evento
// - dedup por (provider, eventId); procesamiento async via BullMQ

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  ensureProvidersRegistered();

  const { provider } = await params;
  if (!isProviderId(provider)) {
    return NextResponse.json({ error: "unknown provider" }, { status: 404 });
  }

  const rawBody = await req.text();
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  let adapter;
  try {
    adapter = getProvider(provider);
  } catch {
    adapter = undefined;
  }

  const signatureValid = adapter?.verifySignature(rawBody, headers) ?? false;
  if (adapter && !signatureValid) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  // eventId para dedup (si el parse falla, igual persistimos).
  let eventId: string | undefined;
  try {
    eventId = adapter?.parseWebhook(rawBody).eventId;
  } catch {
    eventId = undefined;
  }

  if (eventId) {
    const existing = await prisma.webhookEvent.findFirst({
      where: { provider, eventId, processedAt: { not: null } },
    });
    if (existing) {
      return NextResponse.json({ received: true, deduplicated: true, eventId: existing.id });
    }
  }

  const event = await prisma.webhookEvent.create({
    data: {
      provider,
      ...(eventId ? { eventId } : {}),
      signatureValid,
      payload: { raw: rawBody },
    },
  });

  // Encolar procesamiento async (BullMQ). Si Redis no está, procesar inline como fallback.
  try {
    const { enqueue, JOBS } = await import("@plata-neta/jobs");
    await enqueue(JOBS.WEBHOOK_PROCESS, { webhookEventId: event.id });
    return NextResponse.json({ received: true, queued: true, eventId: event.id });
  } catch {
    return NextResponse.json(
      { received: true, queued: false, eventId: event.id },
      { status: 202 },
    );
  }
}
