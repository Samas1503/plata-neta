import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription } from "@/components/heroui";
import { Hero3D } from "@/components/hero3d";
import { Reveal } from "@/components/reveal";

const SECTIONS = [
  {
    kicker: "Cobros",
    title: "Cobrá por transferencia desde cualquier billetera",
    text: "Generá un intent de cobro y recibí plata por CVU, alias o QR interoperable — Mercado Pago, MODO, Ualá o Naranja X. Confirmación en tiempo real vía webhooks verificados.",
    points: [
      ["Un solo link de cobro", "El pagador elige su billetera; vos recibís directo en tu cuenta."],
      ["Estado en vivo", "Pendiente → procesando → acreditado, con máquina de estados auditada."],
      ["Idempotente", "Reintentos y webhooks duplicados nunca crean cobros de más."],
    ],
    accent: "emerald",
  },
  {
    kicker: "Pagos",
    title: "Pagá a proveedores sin salir del panel",
    text: "Payouts con aprobación en dos pasos y ledger de doble entrada: cada centavo queda registrado y conciliable contra tus extractos de cada billetera.",
    points: [
      ["Aprobación en dos pasos", "Un operador propone, un owner confirma — cero errores de fondos."],
      ["Ledger contable", "Doble entrada: pending → available, siempre balanceado."],
      ["Conciliación", "Webhook + extracto PSP vs ledger, diferencias a la vista."],
    ],
    accent: "sky",
  },
];

const PREMIUM = [
  ["Multi-tenant", "Un comercio, muchos usuarios con roles OWNER/OPERATOR/VIEWER."],
  ["Stablecoins", "Cobros internacionales vía Ripio, liquidados en ARS."],
  ["Planes por GMV", "Tu suscripción crece con tu volumen, sin % por transacción."],
  ["Sandbox", "Probá todo sin tocar fondos reales."],
  ["Credenciales cifradas", "Tus claves PSP van cifradas con AES-256-GCM."],
  ["Webhook-first", "Eventos persistidos antes de procesar: nada se pierde."],
];

const QUOTES = [
  "Cobrar por transferencia directo a mi cuenta, sin comisión por venta.",
  "Todos mis rieles de pago en un solo panel — por fin.",
  "El ledger me ordena la plata mejor que mi Excel.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-background to-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-default-200/60 bg-background/80 px-8 py-4 backdrop-blur">
        <span className="text-lg font-bold tracking-tight">plata-neta</span>
        <div className="hidden items-center gap-6 text-sm text-default-500 md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Funciones</a>
          <a href="#premium" className="transition-colors hover:text-foreground">Completo</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-default-500 transition-colors hover:text-foreground">
            Ingresar
          </Link>
          <Link href="/register"><Button variant="primary" size="sm">Crear cuenta</Button></Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative mx-auto grid max-w-6xl items-center gap-8 px-8 pb-24 pt-20 md:grid-cols-2">
        <Reveal className="text-left">
          <div className="rounded-3xl border border-white/30 bg-white/50 px-10 py-10 shadow-xl shadow-emerald-100/40 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Cobros y pagos por transferencia
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight">
              Todos tus rieles de pago,
              <br />
              en un solo lugar
            </h1>
            <p className="mt-6 max-w-xl text-lg text-default-600">
              Mercado Pago, MODO, Ualá, Naranja X y stablecoins vía Ripio.
              Suscripción mensual según tu volumen — los fondos van directo
              a tus cuentas, nunca por las nuestras.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/register"><Button variant="primary" size="lg">Empezar ahora</Button></Link>
              <Link href="/login"><Button variant="outline" size="lg">Ya tengo cuenta</Button></Link>
            </div>
          </div>
        </Reveal>
        <div className="relative hidden h-[480px] md:block">
          <Hero3D />
        </div>
      </header>

      {/* Secciones alternadas */}
      <main id="features" className="mx-auto max-w-6xl space-y-24 px-8 py-16">
        {SECTIONS.map((s, si) => (
          <section
            key={s.kicker}
            className={`grid items-center gap-10 md:grid-cols-2 ${si % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <Reveal>
              <p className={`text-sm font-semibold uppercase tracking-widest ${s.accent === "emerald" ? "text-emerald-600" : "text-sky-600"}`}>
                {s.kicker}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">{s.title}</h2>
              <p className="mt-4 text-default-500">{s.text}</p>
            </Reveal>
            <Reveal delay={120}>
              <Card className="shadow-md">
                <CardHeader className="space-y-6 p-6">
                  {s.points.map(([t, d]) => (
                    <div key={t}>
                      <CardTitle className="text-base">{t}</CardTitle>
                      <CardDescription>{d}</CardDescription>
                    </div>
                  ))}
                </CardHeader>
              </Card>
            </Reveal>
          </section>
        ))}

        {/* Premium grid */}
        <section id="premium" className="text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">
              Todo el poder de plata-neta
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-default-500">
              Incluido en tu suscripción mensual por tier de volumen.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {PREMIUM.map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">{t}</CardTitle>
                    <CardDescription>{d}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonios */}
        <section className="space-y-8 border-t border-default-200 pt-16 text-center">
          {QUOTES.map((q, i) => (
            <Reveal key={q} delay={i * 100}>
              <blockquote className="mx-auto max-w-2xl text-xl font-medium text-default-600">
                “{q}”
              </blockquote>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <Link href="/register">
              <Button variant="primary" size="lg">Creá tu cuenta gratis</Button>
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-default-200 px-8 py-8 text-center text-sm text-default-500">
        plata-neta · cobros y pagos por transferencia · Argentina 🇦🇷
      </footer>
    </div>
  );
}
