import { beforeEach, describe, expect, it, vi } from "vitest";
import { req } from "../../../../__tests__/helpers";

const m = vi.hoisted(() => ({
  auth: vi.fn(),
  intentFindMany: vi.fn((): any => []),
  ledgerFindMany: vi.fn((): any => []),
  intentGroupBy: vi.fn((): any => []),
  ledgerGroupBy: vi.fn((): any => []),
  planFindMany: vi.fn((): any => []),
  payoutFindMany: vi.fn((): any => []),
  ledgerFindManyAll: vi.fn((): any => []),
}));

vi.mock("@/lib/apikey", () => ({ authenticateApiKey: m.auth }));
vi.mock("@plata-neta/db", () => ({
  prisma: {
    paymentIntent: {
      findMany: m.intentFindMany,
      groupBy: m.intentGroupBy,
      aggregate: vi.fn((): any => ({ _sum: { amountCents: 500000n } })),
    },
    ledgerEntry: {
      findMany: m.ledgerFindMany,
      groupBy: m.ledgerGroupBy,
    },
    payout: { findMany: m.payoutFindMany },
    plan: { findMany: m.planFindMany },
  },
}));

const AUTH = { tenantId: "t1", keyId: "k1" };

describe("rutas de lectura", () => {
  beforeEach(() => vi.clearAllMocks());

  it("reconciliation: 401 sin auth", async () => {
    const { GET } = await import("../reconciliation/route");
    m.auth.mockResolvedValue(null);
    expect((await GET(req("http://localhost:4500/api/v1/reconciliation"))).status).toBe(401);
  });

  it("reconciliation: detecta intent SUCCEEDED sin ledger balance", async () => {
    const { GET } = await import("../reconciliation/route");
    m.auth.mockResolvedValue(AUTH);
    m.intentFindMany.mockResolvedValue([
      { id: "i1", provider: "uala", status: "SUCCEEDED", amountCents: 1000n },
    ]);
    m.ledgerFindMany.mockResolvedValue([]); // sin asientos → drift
    const body = await (await GET(req("http://localhost:4500/api/v1/reconciliation", { auth: "sk_test_x" }))).json();
    expect(body.drifts.length).toBeGreaterThan(0);
    expect(body.drifts[0].expected).toBe("missing ledger entries");
  });

  it("reconciliation: todo balanceado → 0 drifts", async () => {
    const { GET } = await import("../reconciliation/route");
    m.auth.mockResolvedValue(AUTH);
    m.intentFindMany.mockResolvedValue([
      { id: "i1", provider: "uala", status: "SUCCEEDED", amountCents: 1000n },
    ]);
    m.ledgerFindMany.mockResolvedValue([
      { refId: "i1", account: "available", debitCents: 1000n, creditCents: 0n },
      { refId: "i1", account: "clearing", debitCents: 0n, creditCents: 1000n },
    ]);
    const body = await (await GET(req("http://localhost:4500/api/v1/reconciliation", { auth: "sk_test_x" }))).json();
    expect(body.drifts).toHaveLength(0);
  });

  it("reports/summary: 401 + shape", async () => {
    const { GET } = await import("./summary/route");
    m.auth.mockResolvedValue(AUTH);
    m.intentGroupBy.mockResolvedValue([{ provider: "uala", currency: "ARS", _count: 2, _sum: { amountCents: 2000n } }]);
    m.ledgerGroupBy.mockResolvedValue([{ account: "available", _sum: { debitCents: 2000n, creditCents: 0n } }]);
    const body = await (await GET(req("http://localhost:4500/api/v1/reports/summary", { auth: "sk_test_x" }))).json();
    expect(body.gmvByProvider[0].provider).toBe("uala");
    expect(body.ledger.available).toBe("2000");
  });

  it("reports/export: devuelve CSV con headers", async () => {
    const { GET } = await import("./export/route");
    m.auth.mockResolvedValue(AUTH);
    m.intentFindMany.mockResolvedValue([{ id: "i1", provider: "uala", status: "PENDING", amountCents: 100n, currency: "ARS", externalRef: null, createdAt: new Date() }]);
    m.payoutFindMany.mockResolvedValue([]);
    m.ledgerFindMany.mockResolvedValue([]);
    const res = await GET(req("http://localhost:4500/api/v1/reports/export", { auth: "sk_test_x" }));
    expect(res.headers.get("content-type")).toContain("text/csv");
    const text = await res.text();
    expect(text).toContain("payment_intent");
    expect(text.split("\n")[0]).toContain("type");
  });

  it("subscription/preview: tier proyectado por GMV", async () => {
    const { GET } = await import("../subscription/preview/route");
    m.auth.mockResolvedValue(AUTH);
    m.planFindMany.mockResolvedValue([
      { name: "starter", gmvThreshold: 0n, monthlyPrice: 0n },
      { name: "growth", gmvThreshold: 100n, monthlyPrice: 500n },
    ]);
    const body = await (await GET(req("http://localhost:4500/api/v1/subscription/preview", { auth: "sk_test_x" }))).json();
    expect(body.projectedTier).toBe("growth"); // gmv 500000 >= 100
  });
});
