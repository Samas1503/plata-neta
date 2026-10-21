import { redirect } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Label } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { createApiKey, revokeApiKey } from "../actions/keys";

const PROVIDERS = [
  { id: "mercadopago", label: "Mercado Pago" },
  { id: "modo", label: "MODO" },
  { id: "uala", label: "Ualá" },
  { id: "naranjax", label: "Naranja X" },
  { id: "ripio", label: "Ripio" },
];

export default async function KeysPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { created } = await searchParams;

  const [keys, credentials] = await Promise.all([
    prisma.apiKey.findMany({
      where: { tenantId: session.user.tenantId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.pspCredential.findMany({
      where: { tenantId: session.user.tenantId },
      select: { provider: true },
    }),
  ]);
  const connected = new Set(credentials.map((c) => c.provider));

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-8 py-8">
      <div>
        <h1 className="text-2xl font-bold">API Keys y conexiones</h1>
        <p className="text-sm text-default-500">
          Claves para integrar la API y credenciales de tus billeteras conectadas.
        </p>
      </div>

      {created && (
        <Card className="border-emerald-300 bg-emerald-50/60">
          <CardContent className="py-4">
            <p className="text-sm font-semibold text-emerald-800">
              Guardá esta clave — solo se muestra una vez:
            </p>
            <code className="mt-2 block break-all rounded-md bg-white px-3 py-2 font-mono text-sm">
              {created}
            </code>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Usalas en Authorization: Bearer &lt;key&gt;</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={createApiKey} className="flex items-end gap-3">
            <div className="flex-1">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="producción, staging…" required />
            </div>
            <Button type="submit" variant="primary">Crear key</Button>
          </form>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-default-500">
                <th className="pb-2 font-medium">Nombre</th>
                <th className="pb-2 font-medium">Prefijo</th>
                <th className="pb-2 font-medium">Último uso</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {keys.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-default-400">Sin keys todavía.</td></tr>
              )}
              {keys.map((k) => (
                <tr key={k.id} className="border-b last:border-0">
                  <td className="py-2.5">{k.name}</td>
                  <td className="py-2.5 font-mono text-xs">{k.prefix}…</td>
                  <td className="py-2.5 text-default-500">
                    {k.lastUsedAt ? k.lastUsedAt.toLocaleDateString("es-AR") : "nunca"}
                  </td>
                  <td className="py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${k.revokedAt ? "bg-danger-100 text-danger-700" : "bg-success-100 text-success-700"}`}>
                      {k.revokedAt ? "Revocada" : "Activa"}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    {!k.revokedAt && (
                      <form action={revokeApiKey.bind(null, k.id)}>
                        <Button type="submit" variant="ghost" size="sm" className="text-danger-600">
                          Revocar
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billeteras conectadas</CardTitle>
          <CardDescription>
            Las credenciales PSP se cargan por API (POST /api/v1/credentials) — cifradas con AES-256-GCM.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROVIDERS.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl border border-default-200 p-4">
                <span className="font-medium">{p.label}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${connected.has(p.id) ? "bg-success-100 text-success-700" : "bg-default-100 text-default-500"}`}>
                  {connected.has(p.id) ? "Conectada" : "Sin conectar"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
