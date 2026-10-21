import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { getProvider, isProviderId } from "@plata-neta/providers";
import {
  canTransition,
  entriesForCollectionReleased,
  entriesForCollectionSucceeded,
} from "@plata-neta/core";
import { decryptJson } from "@/lib/crypto";
import { ensureProvidersRegistered, toCredentials } from "@/lib/providers";

// Webhooks PSP — RULES.MD §2:
// - verificar firma ANTES de procesar; inválida → 401, nunca procesar
// - responder 200 solo tras persistir el evento

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

  // Persistir antes de cualquier procesamiento.
  const event = await prisma.webhookEvent.create({
    data: {
      provider,
      signatureValid,
      payload: { raw: rawBody },
    },
  });

  if (!adapter) {
    return NextResponse.json(
      { received: true, processed: false, eventId: event.id },
      { status: 202 },
    );
  }

  // Procesamiento inline (Fase 1): parse → getStatus → transición → ledger.
  try {
    const parsed = adapter.parseWebhook(rawBody);
    const intent = await prisma.paymentIntent.findFirst({
      where: { externalRef: parsed.externalRef, provider },
    });
    if (!intent) {
      await prisma.webhookEvent.update({
        where: { id: event.id },
        data: { processedAt: new Date() },
      });
      return NextResponse.json({ received: true, eventId: event.id, matched: false });
    }

    const credential = await prisma.pspCredential.findUnique({
      where: { tenantId_provider: { tenantId: intent.tenantId, provider } },
    });
    if (!credential) throw new Error("missing tenant credentials");

    const newStatus = await adapter.getStatus(
      parsed.externalRef,
      toCredentials(decryptJson(credential.encryptedKeys)),
    );

    if (
      newStatus !== intent.status &&
      canTransition(intent.status as never, newStatus as never)
    ) {
      await prisma.$transaction(async (tx) => {
        await tx.paymentIntent.update({
          where: { id: intent.id },
          data: { status: newStatus },
        });
        const entries =
          newStatus === "SUCCEEDED"
            ? entriesForCollectionSucceeded(intent.id, intent.amountCents)
            : newStatus === "FAILED" || newStatus === "EXPIRED" || newStatus === "REVERSED"
              ? entriesForCollectionReleased(intent.id, intent.amountCents)
              : [];
        for (const e of entries) {
          await tx.ledgerEntry.create({
            data: {
              tenantId: intent.tenantId,
              account: e.account,
              debitCents: e.debitCents,
              creditCents: e.creditCents,
              refType: e.refType,
              refId: e.refId,
            },
          });
        }
      });
    }

    await prisma.webhookEvent.update({
      where: { id: event.id },
      data: { processedAt: new Date(), tenantId: intent.tenantId },
    });
    return NextResponse.json({ received: true, eventId: event.id, status: newStatus });
  } catch (err) {
    // Ya persistido → 200 con processed=false; reproceso queda para jobs de conciliación.
    const message = err instanceof Error ? err.message : "processing error";
    return NextResponse.json({ received: true, processed: false, eventId: event.id, error: message });
  }
}
