"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { key: "PENDIENTE", color: "bg-amber-400", text: "text-amber-600", ring: "ring-amber-400/50" },
  { key: "PROCESANDO", color: "bg-sky-400", text: "text-sky-600", ring: "ring-sky-400/50" },
  { key: "ACREDITADO", color: "bg-emerald-500", text: "text-emerald-600", ring: "ring-emerald-400/50" },
];

// Flujo de estados de un cobro, animado en vivo.
export function StatusFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-1 flex items-center gap-0">
      {STEPS.map((step, i) => (
        <div key={step.key} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 ${
                i === active
                  ? `${step.color} scale-110 shadow-md ring-4 ${step.ring}`
                  : i < active
                    ? "bg-emerald-200"
                    : "bg-default-200"
              }`}
            >
              {i === active && (
                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-white" />
              )}
              {i < active && (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            <span
              className={`text-[10px] font-semibold tracking-wide transition-colors duration-500 ${
                i === active ? step.text : "text-default-400"
              }`}
            >
              {step.key}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="relative mx-1 mb-4 h-0.5 w-10 overflow-hidden rounded bg-default-200">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700 ${
                  i < active ? "w-full" : "w-0"
                }`}
              />
            </div>
          )}
        </div>
      ))}
      <span className="ml-3 flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        EN VIVO
      </span>
    </div>
  );
}
