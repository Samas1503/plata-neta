import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label } from "@/components/heroui";
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
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>Registrá tu comercio y empezá a operar en sandbox</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-4 rounded-md bg-danger-50 p-3 text-sm text-danger-700">
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
            <Button type="submit" variant="primary" className="mt-2">
              Crear cuenta
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-default-500">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Ingresar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
