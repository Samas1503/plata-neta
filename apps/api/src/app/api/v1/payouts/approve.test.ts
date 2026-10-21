import { beforeEach, describe, expect, it, vi } from "vitest";
import { req } from "../../../../__tests__/helpers";

const m = vi.hoisted(() => ({
  auth: vi.fn(),
  payoutFindFirst: vi.fn(),
  payoutUpdate: vi.fn(),
  ledgerCreate: vi.fn(),
  auditCreate: vi.fn(),
}));

vi.mock("@/lib/apikey", () => ({ authenticateApiKey: m.auth }));
vi.mock("@/lib/audit", () => ({ audit: vi.fn(async () => m.auditCreate()) }));
vi.mock("@plata-neta/db", () => ({
  prisma: {
    payout: { findFirst: m.payoutFindFirst, update: m.payoutUpdate },
    ledgerEntry: { create: m.ledgerCreate },
    auditLog: { create: m.auditCreate },
    $transaction: (fn: (tx: unknown) => Promise<unknown>) =>
      fn({ payout: { update: m.payoutUpdate }, ledgerEntry: { create: m.ledgerCreate } }),
  },
}));

import { POST } from "./[id]/approve/route";

const params = { params: Promise.resolve({ id: "p1" }) };
const call = (auth = "sk_test_x") =>
  POST(req(`http://localhost:4500/api/v1/payouts/p1/approve`, { method: "POST", auth }), params);

describe("POST /api/v1/payouts/:id/approve", () => {
  beforeEach(() => vi.clearAllMocks());

  it("401 sin auth", async () => {
    m.auth.mockResolvedValue(null);
    expect((await call("")).status).toBe(401);
  });
  it("404 payout de otro tenant", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    m.payoutFindFirst.mockResolvedValue(null);
    expect((await call()).status).toBe(404);
  });
  it("409 si no está PENDING", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    m.payoutFindFirst.mockResolvedValue({ id: "p1", tenantId: "t1", status: "SUCCEEDED" });
    expect((await call()).status).toBe(409);
  });
  it("200 aprueba + approvedById + ledger + audit", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    m.payoutFindFirst.mockResolvedValue({ id: "p1", tenantId: "t1", status: "PENDING", approvedById: null, amountCents: 10n });
    m.payoutUpdate.mockResolvedValue({ id: "p1", status: "PROCESSING", approvedById: "k1" });
    const res = await call();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.payout.status).toBe("PROCESSING");
    expect(m.ledgerCreate).toHaveBeenCalled();
    expect(m.auditCreate).toHaveBeenCalled();
  });
});
