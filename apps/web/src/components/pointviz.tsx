"use client";

import { useEffect, useState } from "react";

function useCycle(n: number, ms = 1600): number {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return s;
}

// Mini-visuales animadas para los items de Cobros/Pagos.
export function PointViz({ kind }: { kind: string }) {
  const step = useCycle(3, 1600);

  if (kind === "link") {
    // link de cobro → tu cuenta
    return (
      <div className="mt-1 flex items-center gap-0">
        <span className="rounded-md bg-emerald-50 px-2 py-1 font-mono text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
          plata.net/c/8fk2
        </span>
        <div className="relative mx-1.5 h-0.5 w-8 overflow-hidden rounded bg-default-soft">
          <div
            className="absolute inset-y-0 w-2 rounded bg-emerald-500 transition-transform duration-500"
            style={{ transform: `translateX(${step * 12}px)` }}
          />
        </div>
        <span className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-muted ring-1 ring-separator">
          tu cuenta
        </span>
      </div>
    );
  }

  if (kind === "idem") {
    // cobro duplicado se marca y colapsa
    const dup = step === 2;
    return (
      <div className="mt-1 space-y-1">
        <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 ring-1 ring-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-[10px] text-emerald-700">cobro #4821 · $10.000</span>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-md px-2 py-1 ring-1 transition-all duration-500 ${
            dup ? "bg-danger-soft ring-danger/40 opacity-60" : "bg-amber-50 ring-amber-200"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dup ? "bg-danger" : "bg-amber-400"}`} />
          <span className={`font-mono text-[10px] ${dup ? "text-danger line-through" : "text-amber-700"}`}>
            cobro #4821 · dup
          </span>
        </div>
      </div>
    );
  }

  if (kind === "approve") {
    // propone → confirma
    const steps = [
      { label: "Propone", color: "bg-sky-400" },
      { label: "Confirma", color: "bg-emerald-500" },
    ];
    return (
      <div className="mt-1 flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-500 ${
                  step > i ? "bg-emerald-300" : step === i + 1 ? `${s.color} scale-110 ring-4 ring-sky-400/30` : "bg-default-soft"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  {step > i || step === 2 && i === 1 ? <path d="M20 6L9 17l-5-5" /> : <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />}
                </svg>
              </div>
              <span className={`text-[10px] font-semibold ${step === i + 1 ? "text-sky-700" : "text-muted"}`}>
                {s.label}
              </span>
            </div>
            {i === 0 && (
              <div className="relative mx-1.5 mb-4 h-0.5 w-8 overflow-hidden rounded bg-default-soft">
                <div className={`absolute inset-y-0 left-0 bg-sky-400 transition-all duration-700 ${step === 2 ? "w-full" : "w-0"}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (kind === "ledger") {
    // débito / crédito balanceándose
    return (
      <div className="mt-1 space-y-1">
        {([
          ["available", "+$10.000", "bg-emerald-50 text-emerald-700 ring-emerald-200", step !== 0],
          ["pending", "-$10.000", "bg-amber-50 text-amber-700 ring-amber-200", step !== 0],
        ] as [string, string, string, boolean][]).map(([acc, amt, cls, ok]) => (
          <div key={acc} className={`flex items-center justify-between rounded-md px-2 py-1 ring-1 ${cls}`}>
            <span className="font-mono text-[10px]">{acc}</span>
            <span className={`font-mono text-[10px] font-bold transition-all duration-500 ${ok ? "opacity-100" : "opacity-40"}`}>
              {amt} {ok && "✓"}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // "recon": extracto PSP vs ledger — match
  return (
    <div className="mt-1 flex items-center gap-2">
      {["PSP", "LED"].map((src, i) => (
        <div key={src} className="flex-1 space-y-1">
          {[0, 1].map((r) => (
            <div
              key={r}
              className={`h-1.5 rounded transition-colors duration-500 ${
                step === r + 1 ? "bg-emerald-400" : "bg-default-soft"
              }`}
              style={{ width: `${r === 0 ? 100 : 70}%` }}
            />
          ))}
          <span className="block text-center text-[9px] font-bold text-muted">{src}</span>
        </div>
      ))}
      <span className={`text-[10px] font-bold transition-all duration-500 ${step === 2 ? "text-emerald-600 opacity-100" : "opacity-30"}`}>
        ✓ match
      </span>
    </div>
  );
}
