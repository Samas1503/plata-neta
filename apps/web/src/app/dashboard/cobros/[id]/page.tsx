import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  Badge,
  Panel,
  PanelHeader,
  PanelBody,
  TABLE_HEAD,
  TABLE_ROW,
  TX_BADGE,
  TX_LABEL,
  PROVIDER_LABEL,
  formatARS,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

export default async function CobroDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { id } = await params;

  const intent = await prisma.paymentIntent.findFirst({
    where: { id, tenantId: session.user.tenantId },
  });
  if (!intent) notFound();

  const entries = await prisma.ledgerEntry.findMany({
    where: { tenantId: session.user.tenantId, refType: "payment_intent", refId: id },
    orderBy: { createdAt: "asc" },
  });

  const raw = intent.metadata;
  const meta = (typeof raw === "string" ? JSON.parse(raw) : raw) as Record<string, unknown> | null;
  const details = (meta?.["paymentDetails"] ?? {}) as Record<string, unknown>;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-8 py-8">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/cobros" className="text-sm font-medium text-emerald-600 hover:underline">
          ← Cobros
        </Link>
        <Badge tone={TX_BADGE[intent.status] ?? ""}>
          {TX_LABEL[intent.status] ?? intent.status}
        </Badge>
      </div>

      <Panel>
        <PanelHeader
          title="Detalle del cobro"
          description={`${PROVIDER_LABEL[intent.provider] ?? intent.provider} · ${intent.createdAt.toLocaleString("es-AR")}`}
        />
        <PanelBody className="space-y-4">
          <div className="flex justify-between border-b border-separator/60 pb-3">
            <span className="text-muted">Monto</span>
            <span className="text-xl font-bold tracking-tight">{formatARS(intent.amountCents)}</span>
          </div>
          {intent.externalRef && (
            <div className="flex justify-between border-b border-separator/60 pb-3">
              <span className="text-muted">Ref externa</span>
              <span className="font-mono text-sm">{intent.externalRef}</span>
            </div>
          )}
          {typeof details["qrCode"] === "string" && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="mb-2 text-sm font-medium">QR de pago</p>
              <code className="break-all text-xs">{details["qrCode"] as string}</code>
            </div>
          )}
          {typeof details["ticketUrl"] === "string" && (
            <a href={details["ticketUrl"] as string} target="_blank" rel="noreferrer" className="text-sm font-semibold text-emerald-600 hover:underline">
              Ver link de pago →
            </a>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted">Idempotency key</span>
            <span className="font-mono text-xs">{intent.idempotencyKey.slice(0, 24)}…</span>
          </div>
        </PanelBody>
      </Panel>

      <Panel>
        <PanelHeader title="Asientos del ledger" />
        <PanelBody>
          {entries.length === 0 ? (
            <p className="text-sm text-muted">Sin asientos.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2 font-medium">Cuenta</th>
                  <th className="pb-2 font-medium">Débito</th>
                  <th className="pb-2 font-medium">Crédito</th>
                  <th className="pb-2 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className={TABLE_ROW}>
                    <td className="py-2">{e.account}</td>
                    <td className="py-2 font-mono text-xs">{e.debitCents > 0n ? `+${e.debitCents}` : "—"}</td>
                    <td className="py-2 font-mono text-xs">{e.creditCents > 0n ? `-${e.creditCents}` : "—"}</td>
                    <td className="py-2 text-muted">{e.createdAt.toLocaleDateString("es-AR")}</td>
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
