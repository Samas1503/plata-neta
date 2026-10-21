import Link from "next/link";
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
    <main>
      <h1>Ingresar</h1>
      {registered === "1" && (
        <p className="muted" style={{ marginBottom: "1rem" }}>
          Cuenta creada. Ingresá con tu email y contraseña.
        </p>
      )}
      {error && <p className="error">{ERRORS[error] ?? "Error al ingresar."}</p>}
      <form action={login} className="stack">
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" required autoComplete="current-password" />
        </label>
        <button type="submit">Ingresar</button>
      </form>
      <p className="muted" style={{ marginTop: "1.5rem" }}>
        ¿No tenés cuenta? <Link href="/register">Registrate</Link>
      </p>
    </main>
  );
}
