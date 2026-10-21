import { describe, expect, it } from "vitest";
import {
  entriesForCollectionPending,
  entriesForCollectionReleased,
  entriesForCollectionSucceeded,
  entriesForPayoutSent,
  type LedgerEntryInput,
} from "./ledger";

// Todo asiento debe ser balanceado: suma débitos == suma créditos (doble entrada).
function assertBalanced(entries: LedgerEntryInput[]) {
  const debits = entries.reduce((s, e) => s + e.debitCents, 0n);
  const credits = entries.reduce((s, e) => s + e.creditCents, 0n);
  expect(debits).toBe(credits);
}

// Convención contable: cuentas de activo aumentan con débito (net = debit - credit).
function netByAccount(entries: LedgerEntryInput[], account: string): bigint {
  return entries
    .filter((e) => e.account === account)
    .reduce((s, e) => s + e.debitCents - e.creditCents, 0n);
}

describe("ledger entries", () => {
  const amount = 10000n;

  it("collection pending is balanced", () => {
    const entries = entriesForCollectionPending("pi_1", amount);
    assertBalanced(entries);
    expect(netByAccount(entries, "pending")).toBe(amount);
    expect(netByAccount(entries, "clearing")).toBe(-amount);
  });

  it("collection lifecycle nets to available", () => {
    const pending = entriesForCollectionPending("pi_1", amount);
    const succeeded = entriesForCollectionSucceeded("pi_1", amount);
    const all = [...pending, ...succeeded];
    assertBalanced(succeeded);
    expect(netByAccount(all, "pending")).toBe(0n);
    expect(netByAccount(all, "available")).toBe(amount);
    expect(netByAccount(all, "clearing")).toBe(-amount);
  });

  it("collection release clears pending", () => {
    const all = [
      ...entriesForCollectionPending("pi_1", amount),
      ...entriesForCollectionReleased("pi_1", amount),
    ];
    expect(netByAccount(all, "pending")).toBe(0n);
    expect(netByAccount(all, "clearing")).toBe(0n);
  });

  it("payout reduces available", () => {
    const entries = entriesForPayoutSent("po_1", amount);
    assertBalanced(entries);
    expect(netByAccount(entries, "available")).toBe(-amount);
  });
});
