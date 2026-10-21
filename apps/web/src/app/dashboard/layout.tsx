import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/heroui";
import { DashboardNav } from "@/components/dashboard-nav";
import { prisma } from "@plata-neta/db";
import { auth, signOut } from "@/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
  });
  if (!tenant) redirect("/login");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between border-b border-default-200 bg-white px-8 py-4">
        <Link href="/dashboard" className="text-lg font-bold">
          plata-neta
        </Link>
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
      <DashboardNav />
      {children}
    </div>
  );
}
