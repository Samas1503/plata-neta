import { beforeEach, describe, expect, it, vi } from "vitest";
import { req } from "../../../../__tests__/helpers";

const m = vi.hoisted(() => ({
  auth: vi.fn(),
  rateLimit: vi.fn((): any => ({ ok: true, retryAfter: 0 })),
  findUnique: vi.fn((): any => null),
  create: vi.fn((d: { data: Record<string, unknown> }) => ({ id: "p1", ...d.data })),
  findMany: vi.fn((): any => []),
  auditCreate: vi.fn(),
}));

vi.mock("@/lib/apikey", () => ({ authenticateApiKey: m.auth }));
vi.mock("@/lib/ratelimit", () => ({ rateLimit: m.rateLimit, rateLimitKey: () => "k" }));
vi.mock("@/lib/audit", () => ({ audit: vi.fn(async () => m.auditCreate()) }));
vi.mock("@plata-neta/db", () => ({
  prisma: {
    payout: { findUnique: m.findUnique, create: m.create, findMany: m.findMany },
    auditLog: { create: m.auditCreate },
  },
}));
vi.mock("@plata-neta/providers", () => ({
  isProviderId: () => true,
}));

import { GET, POST } from "./route";

const post = (body: unknown, auth = "sk_test_x") =>
  POST(req("http://localhost:4500/api/v1/payouts", { method: "POST", body, auth }));

describe("POST /api/v1/payouts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    m.findUnique.mockResolvedValue(null);
    m.create.mockImplementation((d) => ({ id: "p1", ...d.data }));
  });

  it("401 sin auth", async () => {
    m.auth.mockResolvedValue(null);
    expect((await post({}, "")).status).toBe(401);
  });

  it("400 sin payeeRef/amount/idempotencyKey", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    expect((await post({ payeeRef: "x" })).status).toBe(400);
  });

  it("400 amount <= 0", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    expect((await post({ payeeRef: "x", amountCents: 0, idempotencyKey: "k" })).status).toBe(400);
  });

  it("idempotente: mismo key → mismo payout", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    m.findUnique.mockResolvedValue({ id: "existing" });
    const res = await post({ payeeRef: "cvu", amountCents: 100, idempotencyKey: "dup" });
    expect((await res.json()).duplicated).toBe(true);
  });

  it("bajo umbral → PROCESSING sin aprobación", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    const res = await post({ payeeRef: "cvu", amountCents: 1000, idempotencyKey: "a" });
    const body = await res.json();
    expect(body.requiresApproval).toBe(false);
    expect(body.payout.status).toBe("PROCESSING");
  });

  it("sobre umbral → PENDING + requiresApproval", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    const res = await post({ payeeRef: "cvu", amountCents: 20000000, idempotencyKey: "b" });
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.requiresApproval).toBe(true);
    expect(body.payout.status).toBe("PENDING");
    expect(m.auditCreate).toHaveBeenCalled();
  });
});

describe("GET /api/v1/payouts", () => {
  it("lista del tenant", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    m.findMany.mockResolvedValue([{ id: "p1" }]);
    const res = await GET(req("http://localhost:4500/api/v1/payouts", { auth: "sk_test_x" }));
    expect((await res.json()).payouts).toHaveLength(1);
  });
});
