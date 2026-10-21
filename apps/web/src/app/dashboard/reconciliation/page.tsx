import { redirect } from "next/navigation";
import {
  Badge,
  Panel,
  PanelHeader,
  PanelBody,
  PageHeader,
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

export default async function ReconciliationPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [intents, entries, webhooks] = await Promise.all([
    prisma.paymentIntent.findMany({
      where: { tenantId: session.user.tenantId },
      select: { id: true, provider: true, status: true, amountCents: true },
    }),
    prisma.ledgerEntry.findMany({
      where: { tenantId: session.user.tenantId, refType: "payment_intent" },
      select: { refId: true, account: true, debitCents: true, creditCents: true },
    }),
    prisma.webhookEvent.count({ where: { tenantId: session.user.tenantId, processedAt: null } }),
  ]);

  const byRef = new Map<string, Map<string, bigint>>();
  for (const e of entries) {
    if (!e.refId) continue;
    const m = byRef.get(e.refId) ?? new Map<string, bigint>();
    m.set(e.account, (m.get(e.account) ?? 0n) + e.debitCents - e.creditCents);
    byRef.set(e.refId, m);
  }

  const drifts = intents.filter((i) => {
    const m = byRef.get(i.id);
    const net = (acc: string) => m?.get(acc) ?? 0n;
    if (!m && i.status !== "PENDING") return true;
    if (i.status === "SUCCEEDED" && net("available") !== i.amountCents) return true;
    if (i.status === "PROCESSING" && net("pending") !== i.amountCents) return true;
    if (["FAILED", "EXPIRED", "REVERSED"].includes(i.status) && net("pending") !== 0n) return true;
    return false;
  });

  const ok = intents.length - drifts.length;

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-8 py-8">
      <PageHeader
        title="Conciliación"
        description="Intents vs ledger interno + webhooks pendientes de procesar."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Intents verificados", value: intents.length },
          { label: "Consistentes", value: ok, accent: true },
          { label: "Webhooks sin procesar", value: webhooks },
        ].map((k) => (
          <div key={k.label} className={`${PANEL_SOFT} px-6 py-5`}>
            <p className="text-sm text-muted">{k.label}</p>
            <p className={`mt-1 text-2xl font-bold tracking-tight ${k.accent ? "text-emerald-600" : ""}`}>
              {k.value}
            </p>
          </div>
        ))}
      </div>

      <Panel>
        <PanelHeader
          title="Desajustes"
          description={drifts.length === 0 ? "Todo balanceado." : `${drifts.length} intent(s) con diferencias.`}
        />
        <PanelBody>
          {drifts.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2 font-medium">Intent</th>
                  <th className="pb-2 font-medium">Proveedor</th>
                  <th className="pb-2 font-medium">Estado</th>
                  <th className="pb-2 font-medium">Monto</th>
                </tr>
              </thead>
              <tbody>
                {drifts.map((i) => (
                  <tr key={i.id} className={TABLE_ROW}>
                    <td className="py-2.5 font-mono text-xs">{i.id.slice(0, 14)}…</td>
                    <td className="py-2.5">{PROVIDER_LABEL[i.provider] ?? i.provider}</td>
                    <td className="py-2.5">
                      <Badge tone={TX_BADGE[i.status] ?? ""}>{TX_LABEL[i.status] ?? i.status}</Badge>
                    </td>
                    <td className="py-2.5 font-medium">{formatARS(i.amountCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </PanelBody>
      </Panel>
    </main>
  );
}
