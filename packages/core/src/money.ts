// Money: siempre enteros en la menor unidad (centavos). Nunca float (RULES.MD §1).

export type Currency = "ARS" | "USD" | "USDT" | "USDC";

export interface Money {
  readonly amountCents: bigint;
  readonly currency: Currency;
}

export function money(amountCents: bigint | number, currency: Currency): Money {
  const amount = BigInt(amountCents);
  if (amount < 0n) {
    throw new Error("money: amount must be >= 0");
  }
  return Object.freeze({ amountCents: amount, currency });
}

function assertSameCurrency(a: Money, b: Money): void {
  if (a.currency !== b.currency) {
    throw new Error(`currency mismatch: ${a.currency} vs ${b.currency}`);
  }
}

export function add(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  return money(a.amountCents + b.amountCents, a.currency);
}

export function subtract(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  const result = a.amountCents - b.amountCents;
  if (result < 0n) {
    throw new Error("subtract: result would be negative");
  }
  return money(result, a.currency);
}

export function compare(a: Money, b: Money): -1 | 0 | 1 {
  assertSameCurrency(a, b);
  return a.amountCents < b.amountCents ? -1 : a.amountCents > b.amountCents ? 1 : 0;
}
