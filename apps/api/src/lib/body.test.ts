import { describe, expect, it } from "vitest";
import { sanitizeMetadata } from "./body";

describe("sanitizeMetadata", () => {
  it("null/undefined → {}", () => {
    expect(sanitizeMetadata(null)).toEqual({});
    expect(sanitizeMetadata(undefined)).toEqual({});
  });
  it("objeto plano pasa", () => {
    expect(sanitizeMetadata({ a: 1, b: "x" })).toEqual({ a: "1", b: "x" });
  });
  it("rechaza arrays y no-objetos", () => {
    expect(sanitizeMetadata([1])).toBeNull();
    expect(sanitizeMetadata("x")).toBeNull();
  });
  it("rechaza anidados", () => {
    expect(sanitizeMetadata({ a: { deep: true } })).toBeNull();
  });
  it("rechaza >20 keys", () => {
    const m: Record<string, number> = {};
    for (let i = 0; i < 25; i++) m[`k${i}`] = i;
    expect(sanitizeMetadata(m)).toBeNull();
  });
  it("trunca valores >500 chars", () => {
    const out = sanitizeMetadata({ big: "x".repeat(600) });
    expect(out?.big).toHaveLength(500);
  });
});
