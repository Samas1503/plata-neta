import { prisma } from "@plata-neta/db";
import type { SubscriptionBillData } from "./types";

// subscription.bill — GMV del ciclo → snapshot + tier + monto facturable.
export async function billSubscription(data: SubscriptionBillData) {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const tenants = await prisma.tenant.findMany({
    where: { status: "ACTIVE", ...(data.tenantId ? { id: data.tenantId } : {}) },
  });

  const plans = await prisma.plan.findMany({ orderBy: { gmvThreshold: "asc" } });
  let billed = 0;

  for (const tenant of tenants) {
    const gmv = await prisma.paymentIntent.aggregate({
      where: {
        tenantId: tenant.id,
        status: "SUCCEEDED",
        createdAt: { gte: periodStart, lte: periodEnd },
      },
      _sum: { amountCents: true },
    });
    const gmvTotal = gmv._sum.amountCents ?? 0n;

    const plan = [...plans].reverse().find((p) => gmvTotal >= p.gmvThreshold) ?? plans[0];
    if (!plan) continue;

    await prisma.subscriptionCycle.upsert({
      where: { tenantId_periodStart: { tenantId: tenant.id, periodStart } },
      update: { gmvSnapshot: gmvTotal, tierApplied: plan.name, amountCents: plan.monthlyPrice },
      create: {
        tenantId: tenant.id,
        periodStart,
        periodEnd,
        gmvSnapshot: gmvTotal,
        tierApplied: plan.name,
        amountCents: plan.monthlyPrice,
      },
    });

    if (tenant.planId !== plan.id) {
      await prisma.tenant.update({ where: { id: tenant.id }, data: { planId: plan.id } });
    }
    billed++;
  }
  return { billed, period: periodStart.toISOString().slice(0, 7) };
}
