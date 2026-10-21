import { decryptJson, prisma } from "@plata-neta/db";
import {
  canTransition,
  entriesForCollectionReleased,
  entriesForCollectionSucceeded,
  entriesForPayoutSent,
} from "@plata-neta/core";
import type { ProviderId } from "@plata-neta/providers";
import type { WebhookProcessData, IntentExpireData } from "./types";

async function credentialsFor(tenantId: string, provider: string) {
  const cred = await prisma.pspCredential.findUnique({
    where: { tenantId_provider: { tenantId, provider } },
  });
  if (!cred) return null;
  const plain = decryptJson<{ accessToken: string; webhookSecret?: string; baseUrl?: string }>(
    cred.encryptedKeys,
  );
  return {
    accessToken: plain.accessToken,
    webhookSecret: plain.webhookSecret,
    extra: plain.baseUrl ? { baseUrl: plain.baseUrl } : undefined,
  };
}

// webhook.process — parse + status + transición + ledger (con reintentos BullMQ).
export async function processWebhook(data: WebhookProcessData) {
  const event = await prisma.webhookEvent.findUnique({
    where: { id: data.webhookEventId },
  });
  if (!event || event.processedAt) return;

  const { getProvider } = await import("@plata-neta/providers");
  const adapter = getProvider(event.provider as ProviderId);
  const parsed = adapter.parseWebhook(JSON.stringify(event.payload)); // eslint-disable-line

  const intent = await prisma.paymentIntent.findFirst({
    where: { externalRef: parsed.externalRef, provider: event.provider },
  });
  if (!intent) {
    await prisma.webhookEvent.update({
      where: { id: event.id },
      data: { processedAt: new Date() },
    });
    return;
  }

  const creds = await credentialsFor(intent.tenantId, event.provider);
  if (!creds) throw new Error("missing tenant credentials");

  const newStatus = await adapter.getStatus(parsed.externalRef, creds);
  if (newStatus !== intent.status && canTransition(intent.status, newStatus)) {
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
}

// intent.expire — sweep: PENDING/PROCESSING vencidos → EXPIRED + release.
export async function expireIntents(_data: IntentExpireData) {
  const stale = await prisma.paymentIntent.findMany({
    where: {
      status: { in: ["PENDING", "PROCESSING"] },
      expiresAt: { lte: new Date() },
    },
    take: 200,
  });
  for (const intent of stale) {
    if (!canTransition(intent.status, "EXPIRED")) continue;
    await prisma.$transaction(async (tx) => {
      await tx.paymentIntent.update({
        where: { id: intent.id },
        data: { status: "EXPIRED" },
      });
      for (const e of entriesForCollectionReleased(intent.id, intent.amountCents)) {
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
  return { expired: stale.length };
}

// reconcile.run — re-sincroniza intents PROCESSING viejos contra el PSP.
export async function reconcile() {
  const stale = await prisma.paymentIntent.findMany({
    where: {
      status: { in: ["PENDING", "PROCESSING"] },
      updatedAt: { lte: new Date(Date.now() - 15 * 60 * 1000) },
      externalRef: { not: null },
    },
    take: 100,
  });
  const { getProvider } = await import("@plata-neta/providers");
  let updated = 0;
  for (const intent of stale) {
    try {
      const creds = await credentialsFor(intent.tenantId, intent.provider);
      if (!creds) continue;
      const status = await getProvider(intent.provider as ProviderId).getStatus(intent.externalRef!, creds);
      if (status !== intent.status && canTransition(intent.status, status)) {
        await prisma.paymentIntent.update({ where: { id: intent.id }, data: { status } });
        updated++;
      }
    } catch {
      // reintenta en el próximo ciclo
    }
  }
  return { checked: stale.length, updated };
}

export { entriesForPayoutSent };
