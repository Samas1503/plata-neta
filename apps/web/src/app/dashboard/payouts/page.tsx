import { redirect } from "next/navigation";
import { Button, Input, Label } from "@/components/heroui";
import {
  Badge,
  Panel,
  PanelHeader,
  PanelBody,
  PageHeader,
  BTN_PRIMARY,
  TABLE_HEAD,
  TABLE_ROW,
  TX_BADGE,
  TX_LABEL,
  formatARS,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { createPayout, approvePayout } from "../actions/payouts";

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
      <PageHeader
        title="Pagos"
        description="Payouts a proveedores. Montos sobre el umbral requieren aprobación de un OWNER."
      />

      {isOwner && (
        <Panel>
          <PanelHeader
            title="Nuevo pago"
            description="CVU, alias o wallet del beneficiario"
          />
          <PanelBody>
            <form action={createPayout} className="grid gap-4 sm:grid-cols-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="payeeRef">Destino</Label>
                <Input id="payeeRef" name="payeeRef" placeholder="cvu/alias/address" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="amount">Monto (ARS)</Label>
                <Input id="amount" name="amount" type="number" min="1" step="0.01" required />
              </div>
              <div className="flex items-end">
                <Button type="submit" size="sm" className={BTN_PRIMARY}>Crear payout</Button>
              </div>
            </form>
          </PanelBody>
        </Panel>
      )}

      <Panel>
        <PanelHeader title="Historial" />
        <PanelBody>
          {payouts.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">Sin pagos todavía.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2 font-medium">Fecha</th>
                  <th className="pb-2 font-medium">Destino</th>
                  <th className="pb-2 font-medium">Monto</th>
                  <th className="pb-2 font-medium">Estado</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className={TABLE_ROW}>
                    <td className="py-3">{p.createdAt.toLocaleDateString("es-AR")}</td>
                    <td className="py-3 font-mono text-xs">{p.payeeRef.slice(0, 28)}</td>
                    <td className="py-3 font-medium">{formatARS(p.amountCents)}</td>
                    <td className="py-3">
                      <Badge tone={TX_BADGE[p.status] ?? ""}>
                        {TX_LABEL[p.status] ?? p.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      {p.status === "PENDING" && !p.approvedById && isOwner && (
                        <form action={approvePayout.bind(null, p.id)}>
                          <Button type="submit" size="sm" className={BTN_PRIMARY}>Aprobar</Button>
                        </form>
                      )}
                    </td>
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
