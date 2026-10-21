import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/heroui";
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
      <div>
        <h1 className="text-2xl font-bold">Conciliación</h1>
        <p className="text-sm text-default-500">
          Intents vs ledger interno + webhooks pendientes de procesar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardHeader><CardDescription>Intents verificados</CardDescription><CardTitle className="text-2xl">{intents.length}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Consistentes</CardDescription><CardTitle className="text-2xl text-emerald-600">{ok}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Webhooks sin procesar</CardDescription><CardTitle className="text-2xl">{webhooks}</CardTitle></CardHeader></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desajustes</CardTitle>
          <CardDescription>
            {drifts.length === 0 ? "Todo balanceado." : `${drifts.length} intent(s) con diferencias.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {drifts.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-default-500">
                  <th className="pb-2 font-medium">Intent</th>
                  <th className="pb-2 font-medium">Proveedor</th>
                  <th className="pb-2 font-medium">Estado</th>
                  <th className="pb-2 font-medium">Monto</th>
                </tr>
              </thead>
              <tbody>
                {drifts.map((i) => (
                  <tr key={i.id} className="border-b last:border-0">
                    <td className="py-2.5 font-mono text-xs">{i.id.slice(0, 14)}…</td>
                    <td className="py-2.5">{i.provider}</td>
                    <td className="py-2.5">{i.status}</td>
                    <td className="py-2.5 font-medium">
                      {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(i.amountCents) / 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
