import type { ReactNode } from "react";

// Sistema visual compartido — mismo lenguaje que la landing:
// glass panels, pill buttons emerald, badges suaves, texto muted.

export const BTN_PRIMARY =
  "rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 hover:brightness-110 active:translate-y-0";
export const BTN_OUTLINE =
  "rounded-full border-2 border-emerald-600/40 bg-white/60 px-6 font-semibold text-emerald-700 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-emerald-600 hover:bg-emerald-50";
export const BTN_GHOST =
  "rounded-full px-4 font-medium text-emerald-700 transition-colors hover:bg-emerald-50";

export const PANEL =
  "rounded-3xl border border-white/30 bg-white/50 shadow-xl shadow-emerald-100/40 backdrop-blur-xl";
export const PANEL_SOFT =
  "rounded-2xl border border-emerald-100 bg-white/70 shadow-sm backdrop-blur";

export const ALERT_DANGER =
  "rounded-xl bg-danger-soft p-3 text-sm text-danger-soft-foreground";
export const ALERT_SUCCESS =
  "rounded-xl bg-success-soft p-3 text-sm text-success-soft-foreground";

export const SELECT =
  "rounded-lg border border-field-border bg-field px-3 py-2 text-sm text-field-foreground";

export const TABLE_HEAD = "border-b border-separator text-left text-muted";
export const TABLE_ROW =
  "border-b border-separator/60 last:border-0 transition-colors hover:bg-emerald-50/40";

const BADGE_BASE = "rounded-full px-2.5 py-0.5 text-xs font-medium";

export const TX_BADGE: Record<string, string> = {
  SUCCEEDED: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  PROCESSING: "bg-sky-100 text-sky-700",
  FAILED: "bg-red-100 text-red-600",
  REVERSED: "bg-red-100 text-red-600",
  EXPIRED: "bg-zinc-200/70 text-zinc-600",
};

export const TX_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  PROCESSING: "Procesando",
  SUCCEEDED: "Acreditado",
  FAILED: "Fallido",
  REVERSED: "Revertido",
  EXPIRED: "Expirado",
};

export const ROLE_BADGE: Record<string, string> = {
  OWNER: "bg-emerald-100 text-emerald-700",
  OPERATOR: "bg-sky-100 text-sky-700",
  VIEWER: "bg-zinc-200/70 text-zinc-600",
};

export const PROVIDER_LABEL: Record<string, string> = {
  mercadopago: "Mercado Pago",
  modo: "MODO",
  uala: "Ualá",
  naranjax: "Naranja X",
  ripio: "Ripio",
  brubank: "Brubank",
  personalpay: "Personal Pay",
  cuentadni: "Cuenta DNI",
  prex: "Prex",
  bnaplus: "BNA+",
  galicia: "Galicia",
  santander: "Santander",
  bbva: "BBVA",
  macro: "Macro",
  bna: "Banco Nación",
  provincia: "Banco Provincia",
  credicoop: "Credicoop",
};

export function Badge({ tone, children }: { tone: string; children: ReactNode }) {
  return <span className={`${BADGE_BASE} ${tone}`}>{children}</span>;
}

export function Panel({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`${PANEL} ${className}`}>{children}</div>;
}

export function PanelHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-separator/60 px-6 py-5">
      <h2 className="font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
    </div>
  );
}

export function PanelBody({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
}

export function formatARS(cents: bigint): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(cents) / 100);
}
