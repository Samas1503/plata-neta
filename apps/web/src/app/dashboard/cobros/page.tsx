import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/heroui";
import {
  Badge,
  Panel,
  PanelBody,
  PageHeader,
  BTN_PRIMARY,
  TABLE_HEAD,
  TABLE_ROW,
  TX_BADGE,
  TX_LABEL,
  PROVIDER_LABEL,
  formatARS,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

const PILL = "rounded-full px-3.5 py-1.5 text-sm transition-colors";
const PILL_ON = `${PILL} bg-emerald-500/10 font-medium text-emerald-700`;
const PILL_OFF = `${PILL} text-muted hover:bg-emerald-50 hover:text-foreground`;

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
      <PageHeader
        title="Cobros"
        description="Intents de cobro por transferencia, QR y cripto."
        actions={
          <Link href="/dashboard/cobros/nuevo">
            <Button size="sm" className={BTN_PRIMARY}>+ Nuevo cobro</Button>
          </Link>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/cobros" className={!status && !provider ? PILL_ON : PILL_OFF}>
          Todos
        </Link>
        {statuses.map((s) => (
          <Link key={s} href={`/dashboard/cobros?status=${s}`} className={status === s ? PILL_ON : PILL_OFF}>
            {TX_LABEL[s]}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {providers.map((p) => (
          <Link key={p} href={`/dashboard/cobros?provider=${p}`} className={provider === p ? PILL_ON : PILL_OFF}>
            {PROVIDER_LABEL[p]}
          </Link>
        ))}
      </div>

      <Panel>
        <PanelBody className="px-0 py-0">
          {intents.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">
              Sin cobros para estos filtros. Creá el primero arriba.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="py-3 pl-6 font-medium">Fecha</th>
                  <th className="py-3 font-medium">Proveedor</th>
                  <th className="py-3 font-medium">Ref externa</th>
                  <th className="py-3 font-medium">Monto</th>
                  <th className="py-3 font-medium">Estado</th>
                  <th className="py-3" />
                </tr>
              </thead>
              <tbody>
                {intents.map((i) => (
                  <tr key={i.id} className={TABLE_ROW}>
                    <td className="py-3 pl-6">{i.createdAt.toLocaleDateString("es-AR")}</td>
                    <td className="py-3">{PROVIDER_LABEL[i.provider] ?? i.provider}</td>
                    <td className="py-3 font-mono text-xs">{i.externalRef ?? "—"}</td>
                    <td className="py-3 font-medium">{formatARS(i.amountCents)}</td>
                    <td className="py-3">
                      <Badge tone={TX_BADGE[i.status] ?? ""}>
                        {TX_LABEL[i.status] ?? i.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-6 text-right">
                      <Link href={`/dashboard/cobros/${i.id}`} className="text-xs font-semibold text-emerald-600 hover:underline">
                        Detalle
                      </Link>
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
