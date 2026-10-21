"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "¿Los fondos pasan por plata-neta?",
    a: "No. Los pagos viajan por los rieles de cada billetera (Mercado Pago, MODO, etc.) directo a las cuentas de tu comercio. plata-neta orquesta, nunca custodia tu plata.",
  },
  {
    q: "¿Cómo funciona la suscripción?",
    a: "Elegís un plan mensual según tu volumen de ventas (GMV). No cobramos comisión por transacción: el precio solo cambia cuando tu volumen cambia de tier.",
  },
  {
    q: "¿Qué billeteras y proveedores soporta?",
    a: "Mercado Pago, MODO, Ualá, Naranja X y Ripio (stablecoins para cobros internacionales). Todos detrás de una sola API y un solo panel.",
  },
  {
    q: "¿Necesito cuenta propia en cada proveedor?",
    a: "Sí. Conectás las credenciales de tus propias cuentas — van cifradas con AES-256-GCM y solo se usan para operar a nombre de tu comercio.",
  },
  {
    q: "¿Puedo cobrar desde el exterior?",
    a: "Sí, vía stablecoins con Ripio. El pago entra en cripto y se liquida en pesos a tu cuenta, sin que gestiones wallets.",
  },
  {
    q: "¿Hay ambiente de prueba?",
    a: "Sí. El modo sandbox te deja probar cobros, pagos y webhooks completos sin mover fondos reales.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-emerald-300 bg-white/80 shadow-lg shadow-emerald-100/50"
                : "border-separator bg-white/50 hover:border-emerald-200 hover:bg-white/70"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className={`font-semibold transition-colors ${isOpen ? "text-emerald-700" : ""}`}>
                {f.q}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-emerald-500 text-white" : "bg-default-soft text-muted"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
