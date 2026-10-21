import Link from "next/link";
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
    <main>
      <h1>Crear cuenta</h1>
      <p className="muted" style={{ marginBottom: "1.5rem" }}>
        Registrá tu comercio y empezá a operar en sandbox.
      </p>
      {error && <p className="error">{ERRORS[error] ?? "Error al registrarse."}</p>}
      <form action={register} className="stack">
        <label>
          Nombre del comercio
          <input name="tenantName" required autoComplete="organization" />
        </label>
        <label>
          Tu nombre
          <input name="name" autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" required minLength={8} autoComplete="new-password" />
        </label>
        <button type="submit">Crear cuenta</button>
      </form>
      <p className="muted" style={{ marginTop: "1.5rem" }}>
        ¿Ya tenés cuenta? <Link href="/login">Ingresar</Link>
      </p>
    </main>
  );
}
