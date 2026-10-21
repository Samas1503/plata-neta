import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label } from "@/components/heroui";
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
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Ingresar</CardTitle>
          <CardDescription>Accedé al dashboard de tu comercio</CardDescription>
        </CardHeader>
        <CardContent>
          {registered === "1" && (
            <p className="mb-4 rounded-md bg-success-50 p-3 text-sm text-success-700">
              Cuenta creada. Ingresá con tu email y contraseña.
            </p>
          )}
          {error && (
            <p className="mb-4 rounded-md bg-danger-50 p-3 text-sm text-danger-700">
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
            <Button type="submit" variant="primary" className="mt-2">
              Ingresar
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-default-500">
            ¿No tenés cuenta?{" "}
            <Link href="/register" className="text-accent hover:underline">
              Registrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
