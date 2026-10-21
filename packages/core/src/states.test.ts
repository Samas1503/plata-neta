import { describe, expect, it } from "vitest";
import {
  assertTransition,
  canTransition,
  isTerminal,
} from "./states";
import { add, compare, money, subtract } from "./money";

describe("transaction state machine", () => {
  it("allows PENDING -> PROCESSING", () => {
    expect(canTransition("PENDING", "PROCESSING")).toBe(true);
  });

  it("allows PROCESSING -> SUCCEEDED | FAILED | EXPIRED", () => {
    expect(canTransition("PROCESSING", "SUCCEEDED")).toBe(true);
    expect(canTransition("PROCESSING", "FAILED")).toBe(true);
    expect(canTransition("PROCESSING", "EXPIRED")).toBe(true);
  });

  it("rejects transitions out of terminal states", () => {
    for (const terminal of ["FAILED", "REVERSED", "EXPIRED"] as const) {
      expect(canTransition(terminal, "PENDING")).toBe(false);
      expect(isTerminal(terminal)).toBe(true);
    }
  });

  it("rejects skipping states (PENDING -> SUCCEEDED)", () => {
    expect(canTransition("PENDING", "SUCCEEDED")).toBe(false);
    expect(() => assertTransition("PENDING", "SUCCEEDED")).toThrow();
  });

  it("allows SUCCEEDED -> REVERSED only", () => {
    expect(canTransition("SUCCEEDED", "REVERSED")).toBe(true);
    expect(canTransition("SUCCEEDED", "FAILED")).toBe(false);
  });
});

describe("money", () => {
  it("adds and subtracts integer cents", () => {
    const a = money(10050n, "ARS");
    const b = money(2000n, "ARS");
    expect(add(a, b).amountCents).toBe(12050n);
    expect(subtract(a, b).amountCents).toBe(8050n);
    expect(compare(a, b)).toBe(1);
  });

  it("rejects negative results and currency mismatch", () => {
    const a = money(100n, "ARS");
    expect(() => subtract(a, money(200n, "ARS"))).toThrow();
    expect(() => add(a, money(100n, "USD"))).toThrow();
  });

  it("rejects negative amounts", () => {
    expect(() => money(-5n, "ARS")).toThrow();
  });
});
