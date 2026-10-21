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
  PROVIDER_LABEL,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { createApiKey, revokeApiKey } from "../actions/keys";

const PROVIDERS = Object.entries(PROVIDER_LABEL).map(([id, label]) => ({ id, label }));

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
      <PageHeader
        title="API Keys y conexiones"
        description="Claves para integrar la API y credenciales de tus billeteras conectadas."
      />

      {created && (
        <Panel className="border-emerald-300 bg-emerald-50/60">
          <PanelBody>
            <p className="text-sm font-semibold text-emerald-800">
              Guardá esta clave — solo se muestra una vez:
            </p>
            <code className="mt-2 block break-all rounded-xl border border-emerald-200 bg-white px-3 py-2 font-mono text-sm">
              {created}
            </code>
          </PanelBody>
        </Panel>
      )}

      <Panel>
        <PanelHeader
          title="API Keys"
          description="Usalas en Authorization: Bearer <key>"
        />
        <PanelBody className="space-y-4">
          <form action={createApiKey} className="flex items-end gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="producción, staging…" required />
            </div>
            <Button type="submit" size="sm" className={BTN_PRIMARY}>Crear key</Button>
          </form>
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-2 font-medium">Nombre</th>
                <th className="pb-2 font-medium">Prefijo</th>
                <th className="pb-2 font-medium">Último uso</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {keys.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-muted">Sin keys todavía.</td></tr>
              )}
              {keys.map((k) => (
                <tr key={k.id} className={TABLE_ROW}>
                  <td className="py-2.5">{k.name}</td>
                  <td className="py-2.5 font-mono text-xs">{k.prefix}…</td>
                  <td className="py-2.5 text-muted">
                    {k.lastUsedAt ? k.lastUsedAt.toLocaleDateString("es-AR") : "nunca"}
                  </td>
                  <td className="py-2.5">
                    <Badge tone={k.revokedAt ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"}>
                      {k.revokedAt ? "Revocada" : "Activa"}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-right">
                    {!k.revokedAt && (
                      <form action={revokeApiKey.bind(null, k.id)}>
                        <Button type="submit" variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                          Revocar
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PanelBody>
      </Panel>

      <Panel>
        <PanelHeader
          title="Billeteras conectadas"
          description="Las credenciales PSP se cargan por API (POST /api/v1/credentials) — cifradas con AES-256-GCM."
        />
        <PanelBody>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROVIDERS.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white/70 p-4">
                <span className="font-medium">{p.label}</span>
                <Badge tone={connected.has(p.id) ? "bg-emerald-100 text-emerald-700" : "bg-zinc-200/70 text-zinc-600"}>
                  {connected.has(p.id) ? "Conectada" : "Sin conectar"}
                </Badge>
              </div>
            ))}
          </div>
        </PanelBody>
      </Panel>
    </main>
  );
}
