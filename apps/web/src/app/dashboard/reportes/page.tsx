import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

const fmt = (c: bigint) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(c) / 100);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reportes</h1>
          <p className="text-sm text-default-500">GMV por proveedor, estados y saldo del ledger.</p>
        </div>
        <a href="/api/v1/reports/export" target="_blank" rel="noreferrer">
          <Button variant="outline" size="sm">Exportar CSV</Button>
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardHeader><CardDescription>GMV total</CardDescription><CardTitle className="text-2xl">{fmt(total)}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Saldo disponible</CardDescription><CardTitle className="text-2xl">{fmt(net("available"))}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Pendiente</CardDescription><CardTitle className="text-2xl">{fmt(net("pending"))}</CardTitle></CardHeader></Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>GMV por proveedor</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <tbody>
                {byProvider.map((r) => (
                  <tr key={r.provider} className="border-b last:border-0">
                    <td className="py-2.5">{r.provider}</td>
                    <td className="py-2.5 text-right">{r._count} · {fmt(r._sum.amountCents ?? 0n)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Intents por estado</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <tbody>
                {byStatus.map((r) => (
                  <tr key={r.status} className="border-b last:border-0">
                    <td className="py-2.5">{r.status}</td>
                    <td className="py-2.5 text-right">{r._count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
