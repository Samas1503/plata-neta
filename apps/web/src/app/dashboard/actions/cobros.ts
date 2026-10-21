"use server";

import { redirect } from "next/navigation";
import { prisma } from "@plata-neta/db";
import { entriesForCollectionPending } from "@plata-neta/core";
import { auth } from "@/auth";

export async function createIntent(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const tenantId = session.user.tenantId;

  const provider = String(formData.get("provider") ?? "");
  const amountArs = Number(formData.get("amount"));
  const description = String(formData.get("description") ?? "").trim();

  if (!provider || !Number.isFinite(amountArs) || amountArs <= 0) {
    redirect("/dashboard/cobros/nuevo?error=invalid");
  }

  // El provider debe tener credencial conectada.
  const cred = await prisma.pspCredential.findUnique({
    where: { tenantId_provider: { tenantId, provider } },
  });
  if (!cred) redirect("/dashboard/cobros/nuevo?error=provider");

  const amountCents = BigInt(Math.round(amountArs * 100));
  const idempotencyKey = `web-${crypto.randomUUID()}`;

  const intent = await prisma.$transaction(async (tx) => {
    const created = await tx.paymentIntent.create({
      data: {
        tenantId,
        provider,
        amountCents,
        currency: "ARS",
        idempotencyKey,
        metadata: description ? { description } : {},
        expiresAt: new Date(Date.now() + Number(process.env.INTENT_EXPIRES_MINUTES ?? "60") * 60_000),
      },
    });
    for (const e of entriesForCollectionPending(created.id, amountCents)) {
      await tx.ledgerEntry.create({
        data: {
          tenantId,
          account: e.account,
          debitCents: e.debitCents,
          creditCents: e.creditCents,
          refType: e.refType,
          refId: e.refId,
        },
      });
    }
    return created;
  });

  redirect(`/dashboard/cobros/${intent.id}`);
}
