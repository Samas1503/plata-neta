import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, Input, Label } from "@/components/heroui";
import {
  Panel,
  PanelHeader,
  PanelBody,
  BTN_PRIMARY,
  ALERT_DANGER,
  SELECT,
  PROVIDER_LABEL,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { createIntent } from "../../actions/cobros";

export default async function NuevoCobroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { error } = await searchParams;

  // Solo providers con credencial conectada (regla del spec T6).
  const credentials = await prisma.pspCredential.findMany({
    where: { tenantId: session.user.tenantId },
    select: { provider: true },
  });
  const providers = credentials.map((c) => c.provider);

  return (
    <main className="mx-auto max-w-lg space-y-6 px-8 py-8">
      <Link href="/dashboard/cobros" className="text-sm font-medium text-emerald-600 hover:underline">
        ← Cobros
      </Link>
      <Panel>
        <PanelHeader
          title="Nuevo cobro"
          description="Generá un intent de cobro. Solo aparecen proveedores con credenciales conectadas."
        />
        <PanelBody>
          {providers.length === 0 ? (
            <p className="text-sm text-muted">
              No tenés billeteras conectadas. Cargá credenciales vía API
              (POST /api/v1/credentials) o desde la página de Keys.
            </p>
          ) : (
            <form action={createIntent} className="flex flex-col gap-4">
              {error === "provider" && (
                <p className={ALERT_DANGER}>Proveedor sin credenciales conectadas.</p>
              )}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="provider">Billetera</Label>
                <select id="provider" name="provider" required className={SELECT}>
                  {providers.map((p) => (
                    <option key={p} value={p}>{PROVIDER_LABEL[p] ?? p}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="amount">Monto (ARS)</Label>
                <Input id="amount" name="amount" type="number" min="1" step="0.01" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Input id="description" name="description" placeholder="Venta #1234" />
              </div>
              <Button type="submit" className={`${BTN_PRIMARY} mt-2`}>Crear cobro</Button>
            </form>
          )}
        </PanelBody>
      </Panel>
    </main>
  );
}
