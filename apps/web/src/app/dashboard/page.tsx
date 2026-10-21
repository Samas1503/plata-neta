import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth, signOut } from "@/auth";

const STATUS_STYLE: Record<string, string> = {
  SUCCEEDED: "bg-success-100 text-success-700",
  PENDING: "bg-warning-100 text-warning-700",
  PROCESSING: "bg-accent-100 text-accent-700",
  FAILED: "bg-danger-100 text-danger-700",
  REVERSED: "bg-danger-100 text-danger-700",
  EXPIRED: "bg-default-100 text-default-600",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  PROCESSING: "Procesando",
  SUCCEEDED: "Acreditado",
  FAILED: "Fallido",
  REVERSED: "Revertido",
  EXPIRED: "Expirado",
};

const PROVIDER_LABEL: Record<string, string> = {
  mercadopago: "Mercado Pago",
  modo: "MODO",
  uala: "Ualá",
  naranjax: "Naranja X",
  ripio: "Ripio",
};

function formatARS(cents: bigint): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(cents) / 100);
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    include: { plan: true },
  });
  if (!tenant) redirect("/login");

  const [entries, intents] = await Promise.all([
    prisma.ledgerEntry.groupBy({
      by: ["account"],
      where: { tenantId: tenant.id },
      _sum: { debitCents: true, creditCents: true },
    }),
    prisma.paymentIntent.findMany({
      where: { tenantId: tenant.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const balance = (account: string) =>
    entries
      .filter((e) => e.account === account)
      .reduce(
        (s, e) => s + (e._sum.debitCents ?? 0n) - (e._sum.creditCents ?? 0n),
        0n,
      );

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const gmvMonth = intents
    .filter((i) => i.status === "SUCCEEDED" && i.createdAt >= monthStart)
    .reduce((s, i) => s + i.amountCents, 0n);

  const kpis = [
    { label: "Saldo disponible", value: formatARS(balance("available")) },
    { label: "Cobros del mes", value: formatARS(gmvMonth) },
    { label: "Pendiente de acreditar", value: formatARS(balance("pending")) },
    { label: "Plan", value: tenant.plan?.name ?? "sin asignar" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between border-b border-default-200 px-8 py-4">
        <span className="text-lg font-bold">plata-neta</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-default-500">
            {tenant.name} · {session.user.email}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              Salir
            </Button>
          </form>
        </div>
      </nav>
      <nav className="flex gap-1 border-b border-default-200 px-8 py-2 text-sm">
        {[
          ["Resumen", "/dashboard"],
          ["Cobros", "/dashboard/cobros"],
          ["Pagos", "/dashboard/payouts"],
          ["Conciliación", "/dashboard/reconciliation"],
          ["Plan", "/dashboard/plan"],
          ["Reportes", "/dashboard/reportes"],
          ["Keys", "/dashboard/keys"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg px-3 py-1.5 text-default-600 transition-colors hover:bg-default-100 hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </nav>

      <main className="mx-auto max-w-6xl space-y-8 px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Resumen</h1>
            <p className="text-sm text-default-500">
              KYC: {tenant.kycStatus} · Rol: {session.user.role}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" size="sm">
              + Nuevo cobro
            </Button>
            <Button variant="outline" size="sm">
              + Nuevo pago
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader>
                <CardDescription>{kpi.label}</CardDescription>
                <CardTitle className="text-2xl">{kpi.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription>Últimos cobros de tu comercio</CardDescription>
          </CardHeader>
          <CardContent>
            {intents.length === 0 ? (
              <p className="py-8 text-center text-sm text-default-500">
                Todavía no hay cobros. Cuando conectes tus credenciales de PSP y
                generes tu primer intent de cobro, va a aparecer acá.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-default-200 text-left text-default-500">
                    <th className="pb-2 font-medium">Fecha</th>
                    <th className="pb-2 font-medium">Proveedor</th>
                    <th className="pb-2 font-medium">Monto</th>
                    <th className="pb-2 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {intents.map((intent) => (
                    <tr key={intent.id} className="border-b border-default-100 last:border-0">
                      <td className="py-3">
                        {intent.createdAt.toLocaleDateString("es-AR")}
                      </td>
                      <td className="py-3">
                        {PROVIDER_LABEL[intent.provider] ?? intent.provider}
                      </td>
                      <td className="py-3 font-medium">
                        {formatARS(intent.amountCents)}
                      </td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[intent.status] ?? ""}`}
                        >
                          {STATUS_LABEL[intent.status] ?? intent.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Cobros", desc: "Intents de cobro por transferencia y QR" },
            { title: "Pagos", desc: "Payouts con aprobación en dos pasos" },
            { title: "Conciliación", desc: "Extractos PSP vs ledger interno" },
            { title: "Credenciales", desc: "Conectá MP, MODO, Ualá, NX y Ripio" },
          ].map((m) => (
            <Card key={m.title}>
              <CardHeader>
                <CardTitle className="text-base">{m.title}</CardTitle>
                <CardDescription>{m.desc}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/dashboard"><Button variant="ghost" size="sm">Próximamente</Button></Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
