import { redirect } from "next/navigation";
import { prisma } from "@plata-neta/db";
import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    include: { plan: true },
  });

  return (
    <>
      <nav>
        <strong>plata-neta</strong>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button type="submit">Salir</button>
        </form>
      </nav>
      <main>
        <h1>{tenant?.name ?? "Dashboard"}</h1>
        <p className="muted">
          Plan: {tenant?.plan?.name ?? "sin asignar"} · KYC: {tenant?.kycStatus ?? "PENDING"} ·{" "}
          {session.user.email} ({session.user.role})
        </p>
        <div className="grid">
          <div className="card">
            <h3>Cobros</h3>
            <p className="muted">Próximamente — integración Mercado Pago (Fase 1).</p>
          </div>
          <div className="card">
            <h3>Pagos</h3>
            <p className="muted">Próximamente — payouts con aprobación en dos pasos.</p>
          </div>
          <div className="card">
            <h3>Conciliación</h3>
            <p className="muted">Próximamente — cruce de extractos PSP vs ledger.</p>
          </div>
          <div className="card">
            <h3>Credenciales PSP</h3>
            <p className="muted">Conectá tus cuentas de Mercado Pago, MODO, Ualá, Naranja X y Ripio.</p>
          </div>
        </div>
      </main>
    </>
  );
}
