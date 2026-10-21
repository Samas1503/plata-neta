import Link from "next/link";
import { Button, Input, Label } from "@/components/heroui";
import { AuthShell, BTN_PRIMARY } from "@/components/auth-shell";
import { register } from "../actions/auth";

const ERRORS: Record<string, string> = {
  missing: "Completá nombre del comercio, email y contraseña.",
  short_password: "La contraseña debe tener al menos 8 caracteres.",
  email_taken: "Ya existe una cuenta con ese email.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthShell
      kicker="Empezá en minutos"
      title="Crear cuenta"
      description="Registrá tu comercio y empezá a operar en sandbox"
      alt={
        <Link
          href="/login"
          className="text-sm font-medium text-muted transition-colors hover:text-emerald-700"
        >
          Ingresar
        </Link>
      }
    >
      {error && (
        <p className="rounded-xl bg-danger-soft p-3 text-sm text-danger-soft-foreground">
          {ERRORS[error] ?? "Error al registrarse."}
        </p>
      )}
      <form action={register} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tenantName">Nombre del comercio</Label>
          <Input id="tenantName" name="tenantName" required autoComplete="organization" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Tu nombre</Label>
          <Input id="name" name="name" autoComplete="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
        </div>
        <Button type="submit" className={`${BTN_PRIMARY} mt-2`}>
          Crear cuenta
        </Button>
      </form>
      <p className="text-sm text-muted">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
          Ingresar
        </Link>
      </p>
    </AuthShell>
  );
}
