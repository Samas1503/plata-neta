import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente", PROCESSING: "Procesando", SUCCEEDED: "Acreditado",
  FAILED: "Fallido", REVERSED: "Revertido", EXPIRED: "Expirado",
};

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

  const meta = intent.metadata as Record<string, unknown> | null;
  const details = (meta?.["paymentDetails"] ?? {}) as Record<string, unknown>;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-8 py-8">
      <Link href="/dashboard/cobros" className="text-sm text-accent hover:underline">← Cobros</Link>

      <Card>
        <CardHeader>
          <CardTitle>Cobro · {STATUS_LABEL[intent.status]}</CardTitle>
          <CardDescription>{intent.provider} · {intent.createdAt.toLocaleString("es-AR")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-default-500">Monto</span>
            <span className="text-xl font-bold">
              {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(Number(intent.amountCents) / 100)}
            </span>
          </div>
          {intent.externalRef && (
            <div className="flex justify-between border-b pb-3">
              <span className="text-default-500">Ref externa</span>
              <span className="font-mono text-sm">{intent.externalRef}</span>
            </div>
          )}
          {typeof details["qrCode"] === "string" && (
            <div className="rounded-lg bg-default-50 p-4">
              <p className="mb-2 text-sm font-medium">QR de pago</p>
              <code className="break-all text-xs">{details["qrCode"] as string}</code>
            </div>
          )}
          {typeof details["ticketUrl"] === "string" && (
            <a href={details["ticketUrl"] as string} target="_blank" rel="noreferrer" className="text-accent text-sm hover:underline">
              Ver link de pago →
            </a>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-default-500">Idempotency key</span>
            <span className="font-mono text-xs">{intent.idempotencyKey.slice(0, 24)}…</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Asientos del ledger</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-sm text-default-400">Sin asientos.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-default-500">
                  <th className="pb-2 font-medium">Cuenta</th>
                  <th className="pb-2 font-medium">Débito</th>
                  <th className="pb-2 font-medium">Crédito</th>
                  <th className="pb-2 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-b last:border-0">
                    <td className="py-2">{e.account}</td>
                    <td className="py-2 font-mono text-xs">{e.debitCents > 0n ? `+${e.debitCents}` : "—"}</td>
                    <td className="py-2 font-mono text-xs">{e.creditCents > 0n ? `-${e.creditCents}` : "—"}</td>
                    <td className="py-2 text-default-500">{e.createdAt.toLocaleDateString("es-AR")}</td>
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
