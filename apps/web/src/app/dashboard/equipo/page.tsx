import { redirect } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Label } from "@/components/heroui";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";
import { inviteUser, changeRole } from "../actions/equipo";

const ROLE_STYLE: Record<string, string> = {
  OWNER: "bg-accent-100 text-accent-700",
  OPERATOR: "bg-success-100 text-success-700",
  VIEWER: "bg-default-100 text-default-600",
};

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
      <div>
        <h1 className="text-2xl font-bold">Equipo</h1>
        <p className="text-sm text-default-500">
          Usuarios del tenant. Solo OWNER puede invitar o cambiar roles.
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-danger-50 p-3 text-sm text-danger-700">
          {error === "exists" ? "Ya existe un usuario con ese email."
            : error === "self" ? "No podés cambiar tu propio rol."
            : "Datos inválidos (password mín. 8 chars)."}
        </p>
      )}

      {isOwner && (
        <Card>
          <CardHeader>
            <CardTitle>Invitar usuario</CardTitle>
            <CardDescription>OPERATOR opera cobros/pagos; VIEWER solo lectura.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={inviteUser} className="grid gap-4 sm:grid-cols-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required minLength={8} />
              </div>
              <div className="flex items-end gap-2">
                <select name="role" className="rounded-lg border border-default-300 px-2 py-2 text-sm">
                  <option value="OPERATOR">OPERATOR</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
                <Button type="submit" variant="primary" size="sm">Invitar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Miembros</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-default-500">
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Nombre</th>
                <th className="pb-2 font-medium">Rol</th>
                {isOwner && <th className="pb-2" />}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="py-2.5">{u.email}</td>
                  <td className="py-2.5 text-default-500">{u.name ?? "—"}</td>
                  <td className="py-2.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_STYLE[u.role]}`}>{u.role}</span>
                  </td>
                  {isOwner && (
                    <td className="py-2.5 text-right">
                      {u.id !== session.user.id && (
                        <form action={changeRole.bind(null, u.id)} className="inline-flex gap-1">
                          <select name="role" defaultValue={u.role} className="rounded-lg border border-default-300 px-2 py-1 text-xs">
                            <option value="OWNER">OWNER</option>
                            <option value="OPERATOR">OPERATOR</option>
                            <option value="VIEWER">VIEWER</option>
                          </select>
                          <Button type="submit" variant="outline" size="sm">Cambiar</Button>
                        </form>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}
