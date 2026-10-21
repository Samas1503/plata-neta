"use server";

import { redirect } from "next/navigation";
import { prisma } from "@plata-neta/db";
import { canTransition, entriesForPayoutSent } from "@plata-neta/core";
import { auth } from "@/auth";

async function requireRole(roles: string[]) {
  const session = await auth();
  if (!session?.user || !roles.includes(session.user.role)) {
    redirect("/dashboard");
  }
  return session.user;
}

const APPROVAL_THRESHOLD = BigInt(process.env.PAYOUT_APPROVAL_THRESHOLD ?? "10000000");

export async function createPayout(formData: FormData): Promise<void> {
  const user = await requireRole(["OWNER", "OPERATOR"]);
  const payeeRef = String(formData.get("payeeRef") ?? "").trim();
  const amountArs = Number(formData.get("amount"));
  if (!payeeRef || !Number.isFinite(amountArs) || amountArs <= 0) {
    redirect("/dashboard/payouts?error=invalid");
  }
  const amountCents = BigInt(Math.round(amountArs * 100));

  await prisma.payout.create({
    data: {
      tenantId: user.tenantId,
      provider: "mercadopago",
      payeeRef,
      amountCents,
      currency: "ARS",
      idempotencyKey: `web-${crypto.randomUUID()}`,
      createdByUserId: user.id!,
      status: amountCents >= APPROVAL_THRESHOLD ? "PENDING" : "PROCESSING",
    },
  });
  redirect("/dashboard/payouts");
}

export async function approvePayout(payoutId: string): Promise<void> {
  const user = await requireRole(["OWNER"]);

  const payout = await prisma.payout.findUnique({ where: { id: payoutId } });
  if (!payout || payout.tenantId !== user.tenantId) redirect("/dashboard/payouts");
  if (payout.status !== "PENDING" || payout.approvedById) redirect("/dashboard/payouts");
  // Dos pasos: el aprobador no puede ser el creador.
  if (payout.createdByUserId === user.id) redirect("/dashboard/payouts?error=self_approve");
  if (!canTransition(payout.status, "PROCESSING")) redirect("/dashboard/payouts");

  await prisma.$transaction(async (tx) => {
    await tx.payout.update({
      where: { id: payout.id },
      data: { approvedById: user.id!, status: "PROCESSING" },
    });
    for (const e of entriesForPayoutSent(payout.id, payout.amountCents)) {
      await tx.ledgerEntry.create({
        data: {
          tenantId: payout.tenantId,
          account: e.account,
          debitCents: e.debitCents,
          creditCents: e.creditCents,
          refType: e.refType,
          refId: e.refId,
        },
      });
    }
  });
  redirect("/dashboard/payouts");
}
