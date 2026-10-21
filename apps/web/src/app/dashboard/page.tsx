import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/heroui";
import {
  Badge,
  Panel,
  PanelHeader,
  PanelBody,
  PageHeader,
  BTN_PRIMARY,
  BTN_OUTLINE,
  PANEL_SOFT,
  TABLE_HEAD,
  TABLE_ROW,
  TX_BADGE,
  TX_LABEL,
  PROVIDER_LABEL,
  formatARS,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

const MODULES = [
  { title: "Cobros", desc: "Intents de cobro por transferencia y QR", href: "/dashboard/cobros" },
  { title: "Pagos", desc: "Payouts con aprobación en dos pasos", href: "/dashboard/payouts" },
  { title: "Conciliación", desc: "Extractos PSP vs ledger interno", href: "/dashboard/reconciliation" },
  { title: "Credenciales", desc: "Conectá MP, MODO, Ualá, NX y Ripio", href: "/dashboard/keys" },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    include: { plan: true },
  });
  if (!tenant) redirect("/login");

  const [entries, intents] = await Promise.all([
    prisma.ledgerEntry.groupBy({
      by: ["account"],
      where: { tenantId: tenant.id },
      _sum: { debitCents: true, creditCents: true },
    }),
    prisma.paymentIntent.findMany({
      where: { tenantId: tenant.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const balance = (account: string) =>
    entries
      .filter((e) => e.account === account)
      .reduce(
        (s, e) => s + (e._sum.debitCents ?? 0n) - (e._sum.creditCents ?? 0n),
        0n,
      );

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const gmvMonth = intents
    .filter((i) => i.status === "SUCCEEDED" && i.createdAt >= monthStart)
    .reduce((s, i) => s + i.amountCents, 0n);

  const kpis = [
    { label: "Saldo disponible", value: formatARS(balance("available")) },
    { label: "Cobros del mes", value: formatARS(gmvMonth) },
    { label: "Pendiente de acreditar", value: formatARS(balance("pending")) },
    { label: "Plan", value: tenant.plan?.name ?? "sin asignar" },
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-8 py-8">
      <PageHeader
        title="Resumen"
        description={`KYC: ${tenant.kycStatus} · Rol: ${session.user.role}`}
        actions={
          <>
            <Link href="/dashboard/cobros/nuevo">
              <Button size="sm" className={BTN_PRIMARY}>+ Nuevo cobro</Button>
            </Link>
            <Link href="/dashboard/payouts">
              <Button size="sm" className={BTN_OUTLINE}>+ Nuevo pago</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${PANEL_SOFT} px-6 py-5`}>
            <p className="text-sm text-muted">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{kpi.value}</p>
          </div>
        ))}
      </div>

      <Panel>
        <PanelHeader
          title="Actividad reciente"
          description="Últimos cobros de tu comercio"
        />
        <PanelBody>
          {intents.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              Todavía no hay cobros. Cuando conectes tus credenciales de PSP y
              generes tu primer intent de cobro, va a aparecer acá.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2 font-medium">Fecha</th>
                  <th className="pb-2 font-medium">Proveedor</th>
                  <th className="pb-2 font-medium">Monto</th>
                  <th className="pb-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {intents.map((intent) => (
                  <tr key={intent.id} className={TABLE_ROW}>
                    <td className="py-3">
                      {intent.createdAt.toLocaleDateString("es-AR")}
                    </td>
                    <td className="py-3">
                      {PROVIDER_LABEL[intent.provider] ?? intent.provider}
                    </td>
                    <td className="py-3 font-medium">
                      {formatARS(intent.amountCents)}
                    </td>
                    <td className="py-3">
                      <Badge tone={TX_BADGE[intent.status] ?? ""}>
                        {TX_LABEL[intent.status] ?? intent.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </PanelBody>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((m) => (
          <Link key={m.title} href={m.href} className="group">
            <div
              className={`${PANEL_SOFT} h-full px-6 py-5 transition-all group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl group-hover:shadow-emerald-200/50`}
            >
              <h3 className="font-semibold tracking-tight">{m.title}</h3>
              <p className="mt-1 text-sm text-muted">{m.desc}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-600 transition-all group-hover:translate-x-0.5">
                Abrir →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
