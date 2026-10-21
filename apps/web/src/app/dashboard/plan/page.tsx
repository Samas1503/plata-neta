import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

function fmt(cents: bigint): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(cents) / 100);
}

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
      <div>
        <h1 className="text-2xl font-bold">Plan y suscripción</h1>
        <p className="text-sm text-default-500">Tu tier se ajusta al volumen de ventas de cada mes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Plan actual</CardDescription>
            <CardTitle className="text-3xl">{tenant.plan?.name ?? "sin plan"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{tenant.plan ? fmt(tenant.plan.monthlyPrice) : "—"}<span className="text-sm text-default-500">/mes</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>GMV del mes</CardDescription>
            <CardTitle className="text-3xl">{fmt(gmvTotal)}</CardTitle>
          </CardHeader>
          <CardContent>
            {nextPlan ? (
              <>
                <div className="h-2 w-full overflow-hidden rounded-full bg-default-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-default-500">
                  {progress}% hacia <strong>{nextPlan.name}</strong> ({fmt(nextPlan.gmvThreshold)})
                </p>
              </>
            ) : (
              <p className="text-sm text-default-500">Tier máximo alcanzado 🎉</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-default-500">
                <th className="pb-2 font-medium">Plan</th>
                <th className="pb-2 font-medium">Desde GMV</th>
                <th className="pb-2 font-medium">Precio/mes</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className={`border-b last:border-0 ${plans[currentIdx]?.id === p.id ? "bg-emerald-50/50 font-semibold" : ""}`}>
                  <td className="py-2.5">{p.name} {plans[currentIdx]?.id === p.id && "· actual"}</td>
                  <td className="py-2.5">{fmt(p.gmvThreshold)}</td>
                  <td className="py-2.5">{fmt(p.monthlyPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {cycles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ciclos facturados</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-default-500">
                  <th className="pb-2 font-medium">Período</th>
                  <th className="pb-2 font-medium">GMV</th>
                  <th className="pb-2 font-medium">Tier</th>
                  <th className="pb-2 font-medium">Monto</th>
                  <th className="pb-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {cycles.map((c) => (
                  <tr key={c.id} className="border-b last:border-0">
                    <td className="py-2.5">{c.periodStart.toLocaleDateString("es-AR", { month: "long", year: "numeric" })}</td>
                    <td className="py-2.5">{fmt(c.gmvSnapshot)}</td>
                    <td className="py-2.5">{c.tierApplied}</td>
                    <td className="py-2.5">{fmt(c.amountCents)}</td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${c.invoicedAt ? "bg-success-100 text-success-700" : "bg-default-100 text-default-500"}`}>
                        {c.invoicedAt ? "Facturado" : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
