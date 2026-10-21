import { redirect } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Label } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { createPayout, approvePayout } from "../actions/payouts";

const STATUS_STYLE: Record<string, string> = {
  SUCCEEDED: "bg-success-100 text-success-700",
  PENDING: "bg-warning-100 text-warning-700",
  PROCESSING: "bg-accent-100 text-accent-700",
  FAILED: "bg-danger-100 text-danger-700",
  REVERSED: "bg-danger-100 text-danger-700",
  EXPIRED: "bg-default-100 text-default-600",
};

function fmt(cents: bigint): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(cents) / 100);
}

export default async function PayoutsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const payouts = await prisma.payout.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const isOwner = session.user.role === "OWNER";

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pagos</h1>
          <p className="text-sm text-default-500">
            Payouts a proveedores. Montos sobre el umbral requieren aprobación de un OWNER.
          </p>
        </div>
      </div>

      {isOwner && (
        <Card>
          <CardHeader>
            <CardTitle>Nuevo pago</CardTitle>
            <CardDescription>CVU, alias o wallet del beneficiario</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createPayout} className="grid gap-4 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <Label htmlFor="payeeRef">Destino</Label>
                <Input id="payeeRef" name="payeeRef" placeholder="cvu/alias/address" required />
              </div>
              <div>
                <Label htmlFor="amount">Monto (ARS)</Label>
                <Input id="amount" name="amount" type="number" min="1" step="0.01" required />
              </div>
              <div className="flex items-end">
                <Button type="submit" variant="primary">Crear payout</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Historial</CardTitle>
        </CardHeader>
        <CardContent>
          {payouts.length === 0 ? (
            <p className="py-8 text-center text-sm text-default-400">Sin pagos todavía.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-default-500">
                  <th className="pb-2 font-medium">Fecha</th>
                  <th className="pb-2 font-medium">Destino</th>
                  <th className="pb-2 font-medium">Monto</th>
                  <th className="pb-2 font-medium">Estado</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-3">{p.createdAt.toLocaleDateString("es-AR")}</td>
                    <td className="py-3 font-mono text-xs">{p.payeeRef.slice(0, 28)}</td>
                    <td className="py-3 font-medium">{fmt(p.amountCents)}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[p.status] ?? ""}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {p.status === "PENDING" && !p.approvedById && isOwner && (
                        <form action={approvePayout.bind(null, p.id)}>
                          <Button type="submit" variant="primary" size="sm">Aprobar</Button>
                        </form>
                      )}
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
