import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/heroui";
import { DashboardNav } from "@/components/dashboard-nav";
import { BTN_OUTLINE } from "@/components/ds";
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-background to-background text-foreground">
      <nav className="sticky top-0 z-10 border-b border-separator/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <Link href="/dashboard" className="text-lg font-bold tracking-tight">
            plata<span className="text-emerald-600">-neta</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:block">
              {tenant.name} · {session.user.email}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button type="submit" size="sm" className={BTN_OUTLINE}>
                Salir
              </Button>
            </form>
          </div>
        </div>
        <DashboardNav />
      </nav>
      {children}
    </div>
  );
}
