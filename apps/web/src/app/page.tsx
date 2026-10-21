import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/heroui";

const FEATURES = [
  { title: "Cobros", desc: "Transferencias CVU/alias y QR interoperable con confirmación en tiempo real." },
  { title: "Pagos", desc: "Payouts a proveedores y cuentas, con aprobación en dos pasos." },
  { title: "Conciliación", desc: "Cada movimiento cruzado contra tus extractos de cada billetera." },
  { title: "Internacional", desc: "Recibí pagos en stablecoins desde el exterior, liquidados en ARS." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between border-b border-default-200 px-8 py-4">
        <span className="text-lg font-bold">plata-neta</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-default-500 hover:text-foreground">
            Ingresar
          </Link>
          <Link href="/register"><Button variant="primary" size="sm">Crear cuenta</Button></Link>
        </div>
      </nav>
      <main className="mx-auto max-w-4xl px-8 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Cobrá y pagá por transferencia, todos los rieles en un solo lugar
        </h1>
        <p className="mt-4 max-w-xl text-lg text-default-500">
          Mercado Pago, MODO, Ualá, Naranja X y stablecoins vía Ripio. Una sola
          suscripción mensual según tu volumen de ventas — los fondos van
          directo a tus cuentas, nunca por las nuestras.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/register"><Button variant="primary">Empezar ahora</Button></Link>
          <Link href="/login"><Button variant="outline">Ya tengo cuenta</Button></Link>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
