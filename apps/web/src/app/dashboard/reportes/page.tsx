import { redirect } from "next/navigation";
import { Button } from "@/components/heroui";
import {
  Badge,
  Panel,
  PanelHeader,
  PanelBody,
  PageHeader,
  BTN_OUTLINE,
  PANEL_SOFT,
  TABLE_ROW,
  TX_BADGE,
  TX_LABEL,
  PROVIDER_LABEL,
  formatARS,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

export default async function ReportesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [byProvider, byStatus, ledger] = await Promise.all([
    prisma.paymentIntent.groupBy({
      by: ["provider"],
      where: { tenantId: session.user.tenantId, status: "SUCCEEDED" },
      _sum: { amountCents: true },
      _count: true,
    }),
    prisma.paymentIntent.groupBy({
      by: ["status"],
      where: { tenantId: session.user.tenantId },
      _count: true,
    }),
    prisma.ledgerEntry.groupBy({
      by: ["account"],
      where: { tenantId: session.user.tenantId },
      _sum: { debitCents: true, creditCents: true },
    }),
  ]);

  const total = byProvider.reduce((s, r) => s + (r._sum.amountCents ?? 0n), 0n);
  const net = (acc: string) =>
    ledger.filter((l) => l.account === acc).reduce((s, l) => s + (l._sum.debitCents ?? 0n) - (l._sum.creditCents ?? 0n), 0n);

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-8 py-8">
      <PageHeader
        title="Reportes"
        description="GMV por proveedor, estados y saldo del ledger."
        actions={
          <a href="/api/v1/reports/export" target="_blank" rel="noreferrer">
            <Button size="sm" className={BTN_OUTLINE}>Exportar CSV</Button>
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "GMV total", value: formatARS(total) },
          { label: "Saldo disponible", value: formatARS(net("available")) },
          { label: "Pendiente", value: formatARS(net("pending")) },
        ].map((k) => (
          <div key={k.label} className={`${PANEL_SOFT} px-6 py-5`}>
            <p className="text-sm text-muted">{k.label}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <PanelHeader title="GMV por proveedor" />
          <PanelBody>
            <table className="w-full text-sm">
              <tbody>
                {byProvider.map((r) => (
                  <tr key={r.provider} className={TABLE_ROW}>
                    <td className="py-2.5">{PROVIDER_LABEL[r.provider] ?? r.provider}</td>
                    <td className="py-2.5 text-right font-medium">{r._count} · {formatARS(r._sum.amountCents ?? 0n)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelHeader title="Intents por estado" />
          <PanelBody>
            <table className="w-full text-sm">
              <tbody>
                {byStatus.map((r) => (
                  <tr key={r.status} className={TABLE_ROW}>
                    <td className="py-2.5">
                      <Badge tone={TX_BADGE[r.status] ?? ""}>{TX_LABEL[r.status] ?? r.status}</Badge>
                    </td>
                    <td className="py-2.5 text-right font-medium">{r._count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelBody>
        </Panel>
      </div>
    </main>
  );
}
