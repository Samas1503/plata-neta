import { redirect } from "next/navigation";
import {
  Badge,
  Panel,
  PanelHeader,
  PanelBody,
  PageHeader,
  TABLE_HEAD,
  TABLE_ROW,
  formatARS,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

export default async function PlanPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    include: { plan: true },
  });
  if (!tenant) redirect("/login");

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const [gmv, plans, cycles] = await Promise.all([
    prisma.paymentIntent.aggregate({
      where: { tenantId: tenant.id, status: "SUCCEEDED", createdAt: { gte: monthStart, lte: monthEnd } },
      _sum: { amountCents: true },
    }),
    prisma.plan.findMany({ orderBy: { gmvThreshold: "asc" } }),
    prisma.subscriptionCycle.findMany({
      where: { tenantId: tenant.id },
      orderBy: { periodStart: "desc" },
      take: 12,
    }),
  ]);

  const gmvTotal = gmv._sum.amountCents ?? 0n;
  const nextPlan = plans.find((p) => gmvTotal < p.gmvThreshold);
  const currentIdx = plans.findIndex((p) => p.id === tenant.planId);
  const progress = nextPlan && nextPlan.gmvThreshold > 0n
    ? Math.min(Number((gmvTotal * 100n) / nextPlan.gmvThreshold), 100)
    : 100;

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-8 py-8">
      <PageHeader
        title="Plan y suscripción"
        description="Tu tier se ajusta al volumen de ventas de cada mes."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <PanelBody>
            <p className="text-sm text-muted">Plan actual</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{tenant.plan?.name ?? "sin plan"}</p>
            <p className="mt-3 text-2xl font-semibold">
              {tenant.plan ? formatARS(tenant.plan.monthlyPrice) : "—"}
              <span className="text-sm font-normal text-muted">/mes</span>
            </p>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelBody>
            <p className="text-sm text-muted">GMV del mes</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{formatARS(gmvTotal)}</p>
            {nextPlan ? (
              <>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-emerald-100/80">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted">
                  {progress}% hacia <strong className="text-emerald-700">{nextPlan.name}</strong> ({formatARS(nextPlan.gmvThreshold)})
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted">Tier máximo alcanzado 🎉</p>
            )}
          </PanelBody>
        </Panel>
      </div>

      <Panel>
        <PanelHeader title="Tiers" />
        <PanelBody>
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-2 font-medium">Plan</th>
                <th className="pb-2 font-medium">Desde GMV</th>
                <th className="pb-2 font-medium">Precio/mes</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className={`${TABLE_ROW} ${plans[currentIdx]?.id === p.id ? "bg-emerald-50/50 font-semibold" : ""}`}>
                  <td className="py-2.5">
                    {p.name}
                    {plans[currentIdx]?.id === p.id && (
                      <Badge tone="bg-emerald-100 text-emerald-700"> actual</Badge>
                    )}
                  </td>
                  <td className="py-2.5">{formatARS(p.gmvThreshold)}</td>
                  <td className="py-2.5">{formatARS(p.monthlyPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PanelBody>
      </Panel>

      {cycles.length > 0 && (
        <Panel>
          <PanelHeader title="Ciclos facturados" />
          <PanelBody>
            <table className="w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2 font-medium">Período</th>
                  <th className="pb-2 font-medium">GMV</th>
                  <th className="pb-2 font-medium">Tier</th>
                  <th className="pb-2 font-medium">Monto</th>
                  <th className="pb-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {cycles.map((c) => (
                  <tr key={c.id} className={TABLE_ROW}>
                    <td className="py-2.5">{c.periodStart.toLocaleDateString("es-AR", { month: "long", year: "numeric" })}</td>
                    <td className="py-2.5">{formatARS(c.gmvSnapshot)}</td>
                    <td className="py-2.5">{c.tierApplied}</td>
                    <td className="py-2.5">{formatARS(c.amountCents)}</td>
                    <td className="py-2.5">
                      <Badge tone={c.invoicedAt ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>
                        {c.invoicedAt ? "Facturado" : "Pendiente"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelBody>
        </Panel>
      )}
    </main>
  );
}
