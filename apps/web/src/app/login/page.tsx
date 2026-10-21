import Link from "next/link";
import { Button, Input, Label } from "@/components/heroui";
import { AuthShell, BTN_PRIMARY } from "@/components/auth-shell";
import { login } from "../actions/auth";

const ERRORS: Record<string, string> = {
  credentials: "Email o contraseña incorrectos.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string; error?: string }>;
}) {
  const { registered, error } = await searchParams;

  return (
    <AuthShell
      kicker="Bienvenido de vuelta"
      title="Ingresar"
      description="Accedé al dashboard de tu comercio"
      alt={
        <Link href="/register">
          <Button className={BTN_PRIMARY} size="sm">
            Crear cuenta
          </Button>
        </Link>
      }
    >
      {registered === "1" && (
        <p className="rounded-xl bg-success-soft p-3 text-sm text-success-soft-foreground">
          Cuenta creada. Ingresá con tu email y contraseña.
        </p>
      )}
      {error && (
        <p className="rounded-xl bg-danger-soft p-3 text-sm text-danger-soft-foreground">
          {ERRORS[error] ?? "Error al ingresar."}
        </p>
      )}
      <form action={login} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <Button type="submit" className={`${BTN_PRIMARY} mt-2`}>
          Ingresar
        </Button>
      </form>
      <p className="text-sm text-muted">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="font-semibold text-emerald-600 hover:underline">
          Registrate
        </Link>
      </p>
    </AuthShell>
  );
}
