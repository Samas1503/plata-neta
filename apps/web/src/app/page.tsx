import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav>
        <strong>plata-neta</strong>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/login" className="muted">Ingresar</Link>
          <Link href="/register" className="btn">Crear cuenta</Link>
        </div>
      </nav>
      <main>
        <h1>Cobrá y pagá por transferencia, todos los rieles en un solo lugar</h1>
        <p className="muted" style={{ maxWidth: 560 }}>
          Mercado Pago, MODO, Ualá, Naranja X y stablecoins vía Ripio. Una sola
          suscripción mensual según tu volumen de ventas — los fondos van
          directo a tus cuentas, nunca por las nuestras.
        </p>
        <div className="grid">
          <div className="card">
            <h3>Cobros</h3>
            <p className="muted">Transferencias CVU/alias y QR interoperable con confirmación en tiempo real.</p>
          </div>
          <div className="card">
            <h3>Pagos</h3>
            <p className="muted">Payouts a proveedores y cuentas, con aprobación en dos pasos.</p>
          </div>
          <div className="card">
            <h3>Conciliación</h3>
            <p className="muted">Cada movimiento cruzado contra tus extractos de cada billetera.</p>
          </div>
          <div className="card">
            <h3>Internacional</h3>
            <p className="muted">Recibí pagos en stablecoins desde el exterior, liquidados en ARS.</p>
          </div>
        </div>
      </main>
    </>
  );
}
