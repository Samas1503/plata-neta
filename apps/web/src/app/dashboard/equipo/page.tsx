import { redirect } from "next/navigation";
import { Button, Input, Label } from "@/components/heroui";
import {
  Badge,
  Panel,
  PanelHeader,
  PanelBody,
  PageHeader,
  BTN_PRIMARY,
  BTN_OUTLINE,
  ALERT_DANGER,
  SELECT,
  TABLE_HEAD,
  TABLE_ROW,
  ROLE_BADGE,
} from "@/components/ds";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { inviteUser, changeRole } from "../actions/equipo";

export default async function EquipoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { error } = await searchParams;

  const users = await prisma.user.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "asc" },
  });
  const isOwner = session.user.role === "OWNER";

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-8 py-8">
      <PageHeader
        title="Equipo"
        description="Usuarios del tenant. Solo OWNER puede invitar o cambiar roles."
      />

      {error && (
        <p className={ALERT_DANGER}>
          {error === "exists" ? "Ya existe un usuario con ese email."
            : error === "self" ? "No podés cambiar tu propio rol."
            : "Datos inválidos (password mín. 8 chars)."}
        </p>
      )}

      {isOwner && (
        <Panel>
          <PanelHeader
            title="Invitar usuario"
            description="OPERATOR opera cobros/pagos; VIEWER solo lectura."
          />
          <PanelBody>
            <form action={inviteUser} className="grid gap-4 sm:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required minLength={8} />
              </div>
              <div className="flex items-end gap-2">
                <select name="role" className={SELECT}>
                  <option value="OPERATOR">OPERATOR</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
                <Button type="submit" size="sm" className={BTN_PRIMARY}>Invitar</Button>
              </div>
            </form>
          </PanelBody>
        </Panel>
      )}

      <Panel>
        <PanelHeader title="Miembros" />
        <PanelBody>
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Nombre</th>
                <th className="pb-2 font-medium">Rol</th>
                {isOwner && <th className="pb-2" />}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={TABLE_ROW}>
                  <td className="py-2.5">{u.email}</td>
                  <td className="py-2.5 text-muted">{u.name ?? "—"}</td>
                  <td className="py-2.5">
                    <Badge tone={ROLE_BADGE[u.role] ?? ""}>{u.role}</Badge>
                  </td>
                  {isOwner && (
                    <td className="py-2.5 text-right">
                      {u.id !== session.user.id && (
                        <form action={changeRole.bind(null, u.id)} className="inline-flex gap-1">
                          <select name="role" defaultValue={u.role} className={`${SELECT} px-2 py-1 text-xs`}>
                            <option value="OWNER">OWNER</option>
                            <option value="OPERATOR">OPERATOR</option>
                            <option value="VIEWER">VIEWER</option>
                          </select>
                          <Button type="submit" size="sm" className={`${BTN_OUTLINE} px-4`}>Cambiar</Button>
                        </form>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </PanelBody>
      </Panel>
    </main>
  );
}
