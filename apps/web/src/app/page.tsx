import Link from "next/link";
import { Button } from "@/components/heroui";
import { Hero3D } from "@/components/hero3d";
import { Reveal } from "@/components/reveal";

const BTN_PRIMARY =
  "rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 hover:brightness-110 active:translate-y-0";
const BTN_OUTLINE =
  "rounded-full border-2 border-emerald-600/40 bg-white/60 px-6 font-semibold text-emerald-700 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-emerald-600 hover:bg-emerald-50";

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  arrow: "M7 17L17 7M7 7h10v10",
  check: "M20 6L9 17l-5-5",
  bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  coin: "M12 2a10 10 0 100 20 10 10 0 000-20zM9 9h6M9 15h6M12 5v14",
  globe: "M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z",
  tag: "M20 12l-8 8-9-9V4h7l10 8zM7 8h.01",
  flask: "M9 3h6M10 3v6L4 19a2 2 0 002 3h12a2 2 0 002-3L14 9V3",
  key: "M21 2l-2 2m-7.6 7.6a5.5 5.5 0 11-7.8 7.8 5.5 5.5 0 017.8-7.8zm0 0L15 7m0 0l3 3 4-4-3-3-4 4z",
  bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21a2 2 0 004 0",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
};

const SECTIONS = [
  {
    kicker: "Cobros",
    icon: ICONS.coin,
    title: "Cobrá por transferencia desde cualquier billetera",
    text: "Generá un intent de cobro y recibí plata por CVU, alias o QR interoperable — Mercado Pago, MODO, Ualá o Naranja X. Confirmación en tiempo real vía webhooks verificados.",
    points: [
      ["Un solo link de cobro", "El pagador elige su billetera; vos recibís directo en tu cuenta.", ICONS.arrow],
      ["Estado en vivo", "Pendiente → procesando → acreditado, con máquina de estados auditada.", ICONS.bolt],
      ["Idempotente", "Reintentos y webhooks duplicados nunca crean cobros de más.", ICONS.shield],
    ],
    accent: { text: "text-emerald-600", bg: "bg-emerald-500", soft: "bg-emerald-50", border: "border-emerald-200", glow: "shadow-emerald-200/60" },
  },
  {
    kicker: "Pagos",
    icon: ICONS.arrow,
    title: "Pagá a proveedores sin salir del panel",
    text: "Payouts con aprobación en dos pasos y ledger de doble entrada: cada centavo queda registrado y conciliable contra tus extractos de cada billetera.",
    points: [
      ["Aprobación en dos pasos", "Un operador propone, un owner confirma — cero errores de fondos.", ICONS.users],
      ["Ledger contable", "Doble entrada: pending → available, siempre balanceado.", ICONS.layers],
      ["Conciliación", "Webhook + extracto PSP vs ledger, diferencias a la vista.", ICONS.check],
    ],
    accent: { text: "text-sky-600", bg: "bg-sky-500", soft: "bg-sky-50", border: "border-sky-200", glow: "shadow-sky-200/60" },
  },
];

const PREMIUM = [
  ["Multi-tenant", "Un comercio, muchos usuarios con roles OWNER/OPERATOR/VIEWER.", ICONS.users],
  ["Stablecoins", "Cobros internacionales vía Ripio, liquidados en ARS.", ICONS.globe],
  ["Planes por GMV", "Tu suscripción crece con tu volumen, sin % por transacción.", ICONS.tag],
  ["Sandbox", "Probá todo sin tocar fondos reales.", ICONS.flask],
  ["Credenciales cifradas", "Tus claves PSP van cifradas con AES-256-GCM.", ICONS.key],
  ["Webhook-first", "Eventos persistidos antes de procesar: nada se pierde.", ICONS.bell],
] as const;

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
        <span className="text-lg font-bold tracking-tight">
          plata<span className="text-emerald-600">-neta</span>
        </span>
        <div className="hidden items-center gap-6 text-sm text-default-500 md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Funciones</a>
          <a href="#premium" className="transition-colors hover:text-foreground">Completo</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-default-600 transition-colors hover:text-emerald-700">
            Ingresar
          </Link>
          <Link href="/register"><Button className={BTN_PRIMARY} size="sm">Crear cuenta</Button></Link>
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
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                en un solo lugar
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-default-600">
              Mercado Pago, MODO, Ualá, Naranja X y stablecoins vía Ripio.
              Suscripción mensual según tu volumen — los fondos van directo
              a tus cuentas, nunca por las nuestras.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/register"><Button className={BTN_PRIMARY} size="lg">Empezar ahora</Button></Link>
              <Link href="/login"><Button className={BTN_OUTLINE} size="lg">Ya tengo cuenta</Button></Link>
            </div>
          </div>
        </Reveal>
        <div className="relative hidden h-[480px] md:block">
          <Hero3D />
        </div>
      </header>

      {/* Secciones alternadas */}
      <main id="features" className="mx-auto max-w-6xl space-y-28 px-8 py-20">
        {SECTIONS.map((s, si) => (
          <section
            key={s.kicker}
            className={`grid items-center gap-12 md:grid-cols-2 ${si % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <Reveal>
              <div className={`inline-flex items-center gap-2 rounded-full ${s.accent.soft} px-4 py-1.5 text-sm font-semibold ${s.accent.text}`}>
                <Icon d={s.icon} className="h-4 w-4" />
                {s.kicker}
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-default-500">{s.text}</p>
              <Link href="/register" className={`mt-6 inline-flex items-center gap-1.5 font-semibold ${s.accent.text} transition-all hover:gap-3`}>
                Empezar <Icon d={ICONS.arrow} className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <div className={`relative rounded-3xl border ${s.accent.border} bg-white/70 p-2 shadow-xl ${s.accent.glow} backdrop-blur`}>
                <div className={`absolute -top-3 left-6 h-6 w-24 rounded-full ${s.accent.bg} opacity-20 blur-md`} />
                <div className="space-y-2 rounded-2xl bg-white/60 p-6">
                  {s.points.map(([t, d, icon]) => (
                    <div key={t as string} className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-white">
                      <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.accent.soft} ${s.accent.text} transition-transform group-hover:scale-110`}>
                        <Icon d={icon as string} className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{t}</h3>
                        <p className="mt-0.5 text-sm text-default-500">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        ))}

        {/* Premium grid */}
        <section id="premium" className="relative">
          <div className="absolute inset-x-0 -top-8 -z-10 h-64 bg-gradient-to-b from-emerald-100/50 to-transparent blur-3xl" />
          <Reveal className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              <Icon d={ICONS.bolt} className="h-4 w-4" />
              Incluido en tu plan
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Todo el poder de{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                plata-neta
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-default-500">
              Una suscripción mensual por tier de volumen. Sin comisión por transacción.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {PREMIUM.map(([t, d, icon], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-200/50">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-100/60 blur-2xl transition-all group-hover:bg-emerald-200/80" />
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/30 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Icon d={icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-default-500">{d}</p>
                  </div>
                </div>
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
              <Button className={BTN_PRIMARY} size="lg">Creá tu cuenta gratis</Button>
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
