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
import { importarExtracto } from "../actions/extracto";

export default async function ReconciliationPage({
  searchParams,
}: {
  searchParams: Promise<{ imported?: string; unmatched?: string; ambiguous?: string; error?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const sp = await searchParams;

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

      {(sp.imported || sp.unmatched || sp.ambiguous || sp.error) && (
        <div className={`${PANEL_SOFT} border px-6 py-4 text-sm ${sp.error ? "border-red-200 bg-red-50/50 text-red-700" : "border-emerald-200 bg-emerald-50/50 text-emerald-800"}`}>
          {sp.error === "archivo" && "Subí un CSV válido (máx 2MB)."}
          {sp.error === "formato" && "No se encontraron filas con monto — verificá columnas (fecha, monto, referencia)."}
          {!sp.error && (
            <>Importado: <strong>{sp.imported ?? 0}</strong> cobros confirmados ·
            sin match: {sp.unmatched ?? 0} · ambiguos: {sp.ambiguous ?? 0}</>
          )}
        </div>
      )}

      <Panel>
        <PanelHeader
          title="Importar extracto"
          description="Subí el CSV de movimientos de tu banco/billetera — matchea por monto + referencia y confirma cobros automáticamente."
        />
        <PanelBody>
          <form action={importarExtracto} className="flex flex-wrap items-end gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="extracto" className="text-xs font-medium text-muted">
                Archivo CSV (columnas: fecha, monto, referencia/descripción)
              </label>
              <input
                id="extracto" name="extracto" type="file" accept=".csv,text/csv" required
                className="w-full rounded-xl border border-separator bg-white px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-emerald-700"
              />
            </div>
            <button type="submit" className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg">
              Importar y conciliar
            </button>
          </form>
          <p className="mt-3 text-xs text-muted">
            Cada fila del extracto se compara con cobros PENDING/PROCESSING del tenant:
            match por monto exacto (±$0,01) y referencia contenida en la del cobro.
            Si hay más de un candidato, la fila queda como "ambigua" — nunca confirma el cobro equivocado.
          </p>
        </PanelBody>
      </Panel>

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
