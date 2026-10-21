"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: [string, string][] = [
  ["Resumen", "/dashboard"],
  ["Cobros", "/dashboard/cobros"],
  ["Pagos", "/dashboard/payouts"],
  ["Conciliación", "/dashboard/reconciliation"],
  ["Plan", "/dashboard/plan"],
  ["Reportes", "/dashboard/reportes"],
  ["Keys", "/dashboard/keys"],
  ["Equipo", "/dashboard/equipo"],
  ["Auditoría", "/dashboard/auditoria"],
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-8 pb-3 text-sm">
      {LINKS.map(([label, href]) => {
        const active =
          href === "/dashboard"
            ? pathname === href
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              active
                ? "bg-emerald-500/10 font-medium text-emerald-700"
                : "text-muted hover:bg-emerald-50 hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
