import { redirect } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Label } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { createIntent } from "../../actions/cobros";

const PROVIDER_LABEL: Record<string, string> = {
  mercadopago: "Mercado Pago",
  modo: "MODO",
  uala: "Ualá",
  naranjax: "Naranja X",
  ripio: "Ripio",
};

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
    <main className="mx-auto max-w-lg px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo cobro</CardTitle>
          <CardDescription>
            Generá un intent de cobro. Solo aparecen proveedores con credenciales conectadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {providers.length === 0 ? (
            <p className="text-sm text-default-500">
              No tenés billeteras conectadas. Cargá credenciales vía API
              (POST /api/v1/credentials) o desde la página de Keys.
            </p>
          ) : (
            <form action={createIntent} className="flex flex-col gap-4">
              {error === "provider" && (
                <p className="rounded-md bg-danger-50 p-3 text-sm text-danger-700">
                  Proveedor sin credenciales conectadas.
                </p>
              )}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="provider">Billetera</Label>
                <select
                  id="provider"
                  name="provider"
                  required
                  className="rounded-lg border border-default-300 bg-white px-3 py-2 text-sm"
                >
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
              <Button type="submit" variant="primary" className="mt-2">Crear cobro</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
