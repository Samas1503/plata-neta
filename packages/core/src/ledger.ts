// Ledger de doble entrada (RULES.MD §1): fuente única de verdad de fondos.
// Convención contable: cuentas de activo aumentan con débito (net = debit - credit).
// Cuentas: pending | available | clearing | fees

export const ACCOUNTS = {
  PENDING: "pending",
  AVAILABLE: "available",
  CLEARING: "clearing",
  FEES: "fees",
} as const;

export type AccountName = (typeof ACCOUNTS)[keyof typeof ACCOUNTS];

export interface LedgerEntryInput {
  account: AccountName;
  debitCents: bigint;
  creditCents: bigint;
  refType: string;
  refId: string;
}

// Cobro creado (PENDING): claim externo pendiente.
// pending +amount / clearing -amount
export function entriesForCollectionPending(
  refId: string,
  amountCents: bigint,
): LedgerEntryInput[] {
  return [
    { account: "pending", debitCents: amountCents, creditCents: 0n, refType: "payment_intent", refId },
    { account: "clearing", debitCents: 0n, creditCents: amountCents, refType: "payment_intent", refId },
  ];
}

// Cobro acreditado (SUCCEEDED): sale de pending, entra a available.
// available +amount / pending -amount
export function entriesForCollectionSucceeded(
  refId: string,
  amountCents: bigint,
): LedgerEntryInput[] {
  return [
    { account: "available", debitCents: amountCents, creditCents: 0n, refType: "payment_intent", refId },
    { account: "pending", debitCents: 0n, creditCents: amountCents, refType: "payment_intent", refId },
  ];
}

// Cobro fallido/expirado/revertido: libera la posición pendiente.
// clearing +amount / pending -amount
export function entriesForCollectionReleased(
  refId: string,
  amountCents: bigint,
): LedgerEntryInput[] {
  return [
    { account: "clearing", debitCents: amountCents, creditCents: 0n, refType: "payment_intent", refId },
    { account: "pending", debitCents: 0n, creditCents: amountCents, refType: "payment_intent", refId },
  ];
}

// Payout ejecutado: sale de available.
// clearing +amount / available -amount
export function entriesForPayoutSent(
  refId: string,
  amountCents: bigint,
): LedgerEntryInput[] {
  return [
    { account: "clearing", debitCents: amountCents, creditCents: 0n, refType: "payout", refId },
    { account: "available", debitCents: 0n, creditCents: amountCents, refType: "payout", refId },
  ];
}
