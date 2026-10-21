import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

const STATUS_STYLE: Record<string, string> = {
  SUCCEEDED: "bg-success-100 text-success-700",
  PENDING: "bg-warning-100 text-warning-700",
  PROCESSING: "bg-accent-100 text-accent-700",
  FAILED: "bg-danger-100 text-danger-700",
  REVERSED: "bg-danger-100 text-danger-700",
  EXPIRED: "bg-default-100 text-default-600",
};
const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente", PROCESSING: "Procesando", SUCCEEDED: "Acreditado",
  FAILED: "Fallido", REVERSED: "Revertido", EXPIRED: "Expirado",
};
const PROVIDER_LABEL: Record<string, string> = {
  mercadopago: "Mercado Pago", modo: "MODO", uala: "Ualá", naranjax: "Naranja X", ripio: "Ripio",
};

function fmt(cents: bigint): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(cents) / 100);
}

export default async function CobrosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; provider?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { status, provider } = await searchParams;

  const intents = await prisma.paymentIntent.findMany({
    where: {
      tenantId: session.user.tenantId,
      ...(status ? { status: status as never } : {}),
      ...(provider ? { provider } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const statuses = ["SUCCEEDED", "PROCESSING", "PENDING", "FAILED", "EXPIRED", "REVERSED"];
  const providers = Object.keys(PROVIDER_LABEL);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cobros</h1>
          <p className="text-sm text-default-500">Intents de cobro por transferencia, QR y cripto.</p>
        </div>
        <Link href="/dashboard/cobros/nuevo"><Button variant="primary" size="sm">+ Nuevo cobro</Button></Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/cobros">
          <Button variant={!status && !provider ? "primary" : "outline"} size="sm">Todos</Button>
        </Link>
        {statuses.map((s) => (
          <Link key={s} href={`/dashboard/cobros?status=${s}`}>
            <Button variant={status === s ? "primary" : "outline"} size="sm">{STATUS_LABEL[s]}</Button>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {providers.map((p) => (
          <Link key={p} href={`/dashboard/cobros?provider=${p}`}>
            <Button variant={provider === p ? "primary" : "ghost"} size="sm">{PROVIDER_LABEL[p]}</Button>
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {intents.length === 0 ? (
            <p className="py-10 text-center text-sm text-default-400">
              Sin cobros para estos filtros. Creá el primero arriba.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-default-500">
                  <th className="py-3 pl-4 font-medium">Fecha</th>
                  <th className="py-3 font-medium">Proveedor</th>
                  <th className="py-3 font-medium">Ref externa</th>
                  <th className="py-3 font-medium">Monto</th>
                  <th className="py-3 font-medium">Estado</th>
                  <th className="py-3" />
                </tr>
              </thead>
              <tbody>
                {intents.map((i) => (
                  <tr key={i.id} className="border-b last:border-0 hover:bg-default-50">
                    <td className="py-3 pl-4">{i.createdAt.toLocaleDateString("es-AR")}</td>
                    <td className="py-3">{PROVIDER_LABEL[i.provider] ?? i.provider}</td>
                    <td className="py-3 font-mono text-xs">{i.externalRef ?? "—"}</td>
                    <td className="py-3 font-medium">{fmt(i.amountCents)}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[i.status] ?? ""}`}>
                        {STATUS_LABEL[i.status] ?? i.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <Link href={`/dashboard/cobros/${i.id}`} className="text-accent text-xs hover:underline">Detalle</Link>
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
