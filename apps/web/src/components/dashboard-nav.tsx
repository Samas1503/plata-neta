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
    <nav className="flex gap-1 border-b border-default-200 bg-white px-8 py-2 text-sm">
      {LINKS.map(([label, href]) => {
        const active =
          href === "/dashboard"
            ? pathname === href
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              active
                ? "bg-default-100 font-medium text-foreground"
                : "text-default-600 hover:bg-default-100 hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
