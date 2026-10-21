import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

const ACTION_LABEL: Record<string, string> = {
  "api_key.create": "API key creada",
  "api_key.revoke": "API key revocada",
  "credential.upsert": "Credencial PSP actualizada",
  "payout.create": "Payout creado",
  "payout.approve": "Payout aprobado",
  "plan.change": "Cambio de plan",
};

export default async function AuditoriaPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const logs = await prisma.auditLog.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-8 py-8">
      <div>
        <h1 className="text-2xl font-bold">Auditoría</h1>
        <p className="text-sm text-default-500">
          Acciones sobre dinero, credenciales y configuración del tenant.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de acciones</CardTitle>
          <CardDescription>{logs.length} eventos recientes</CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="py-8 text-center text-sm text-default-400">Sin eventos todavía.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-default-500">
                  <th className="pb-2 font-medium">Fecha</th>
                  <th className="pb-2 font-medium">Acción</th>
                  <th className="pb-2 font-medium">Entidad</th>
                  <th className="pb-2 font-medium">Actor</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id} className="border-b last:border-0">
                    <td className="py-2.5 text-default-500">{l.createdAt.toLocaleString("es-AR")}</td>
                    <td className="py-2.5 font-medium">{ACTION_LABEL[l.action] ?? l.action}</td>
                    <td className="py-2.5">
                      <span className="font-mono text-xs">{l.entity}:{l.entityId.slice(-8)}</span>
                    </td>
                    <td className="py-2.5 text-default-500">
                      {l.userId ? "dashboard" : l.apiKeyId ? `api key ${l.apiKeyId.slice(-6)}` : "sistema"}
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
