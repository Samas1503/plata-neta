import { beforeEach, describe, expect, it, vi } from "vitest";
import { req } from "../../../../__tests__/helpers";

const m = vi.hoisted(() => ({
  auth: vi.fn(),
  keyFindFirst: vi.fn(),
  keyCount: vi.fn((): any => 0),
  keyCreate: vi.fn((d: { data: Record<string, unknown> }) => ({ id: "k1", ...d.data })),
  keyFindMany: vi.fn((): any => []),
  auditCreate: vi.fn(),
}));

vi.mock("@/lib/apikey", () => ({
  authenticateApiKey: m.auth,
  generateApiKey: () => ({ prefix: "sk_test_", secret: "sekret", keyHash: "h", display: "sk_test_sek…" }),
}));
vi.mock("@/lib/audit", () => ({ audit: vi.fn(async () => m.auditCreate()) }));
vi.mock("@plata-neta/db", () => ({
  prisma: {
    apiKey: {
      findFirst: m.keyFindFirst,
      count: m.keyCount,
      create: m.keyCreate,
      findMany: m.keyFindMany,
      update: vi.fn(),
    },
    auditLog: { create: m.auditCreate },
  },
}));

import { GET, POST } from "./route";

vi.mock("@/lib/ratelimit", () => ({
  rateLimit: vi.fn(async () => ({ ok: true })),
  rateLimitKey: vi.fn(() => "test-key"),
}));

describe("POST /api/v1/api-keys", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    m.keyCount.mockResolvedValue(0);
    m.keyCreate.mockImplementation((d) => ({ id: "k1", ...d.data }));
  });

  it("401 sin auth ni bootstrap", async () => {
    m.auth.mockResolvedValue(null);
    process.env.BOOTSTRAP_SECRET = "boot";
    const res = await POST(req("http://localhost:4500/api/v1/api-keys", { method: "POST", body: { tenantId: "t1" } }));
    expect(res.status).toBe(401);
  });

  it("bootstrap crea la primera key (devuelve secreto una vez)", async () => {
    m.auth.mockResolvedValue(null);
    process.env.BOOTSTRAP_SECRET = "boot";
    const res = await POST(req("http://localhost:4500/api/v1/api-keys", {
      method: "POST",
      body: { tenantId: "t1", name: "default" },
      headers: { "x-bootstrap-secret": "boot" },
    }));
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.apiKey).toMatch(/^sk_/);
    expect(m.keyCreate).toHaveBeenCalled();
    expect(m.auditCreate).toHaveBeenCalled();
  });

  it("403 bootstrap si el tenant ya tiene keys", async () => {
    m.auth.mockResolvedValue(null);
    process.env.BOOTSTRAP_SECRET = "boot";
    m.keyCount.mockResolvedValue(2);
    const res = await POST(req("http://localhost:4500/api/v1/api-keys", {
      method: "POST",
      body: { tenantId: "t1" },
      headers: { "x-bootstrap-secret": "boot" },
    }));
    expect(res.status).toBe(403);
  });

  it("key autenticada crea key sin bootstrap", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k0" });
    const res = await POST(req("http://localhost:4500/api/v1/api-keys", { method: "POST", body: { name: "ci" }, auth: "sk_test_x" }));
    expect(res.status).toBe(201);
  });
});

describe("GET /api/v1/api-keys", () => {
  it("lista keys del tenant (sin secreto)", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k0" });
    m.keyFindMany.mockResolvedValue([{ id: "k1", name: "a", prefix: "sk_test_" }]);
    const res = await GET(req("http://localhost:4500/api/v1/api-keys", { auth: "sk_test_x" }));
    const body = await res.json();
    expect(body.keys).toHaveLength(1);
    expect(body.keys[0].keyHash).toBeUndefined();
  });
});
