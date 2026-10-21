// Máquina de estados de transacción (GLOSARY.MD / RULES.MD §1).
// Las transiciones solo ocurren vía estas funciones; nunca por asignación directa.

export const TX_STATUSES = [
  "PENDING",
  "PROCESSING",
  "SUCCEEDED",
  "FAILED",
  "REVERSED",
  "EXPIRED",
] as const;

export type TxStatus = (typeof TX_STATUSES)[number];

const TRANSITIONS: Readonly<Record<TxStatus, readonly TxStatus[]>> = {
  PENDING: ["PROCESSING", "EXPIRED", "FAILED"],
  PROCESSING: ["SUCCEEDED", "FAILED", "EXPIRED"],
  SUCCEEDED: ["REVERSED"],
  FAILED: [],
  REVERSED: [],
  EXPIRED: [],
};

const TERMINAL: ReadonlySet<TxStatus> = new Set(["FAILED", "REVERSED", "EXPIRED"]);

export function canTransition(from: TxStatus, to: TxStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

export function assertTransition(from: TxStatus, to: TxStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`invalid transition: ${from} -> ${to}`);
  }
}

export function isTerminal(status: TxStatus): boolean {
  return TERMINAL.has(status);
}
