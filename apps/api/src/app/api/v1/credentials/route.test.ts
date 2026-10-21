import { beforeEach, describe, expect, it, vi } from "vitest";
import { req } from "../../../../__tests__/helpers";

const m = vi.hoisted(() => ({
  auth: vi.fn(),
  rateLimit: vi.fn((): any => ({ ok: true, retryAfter: 0 })),
  upsert: vi.fn((): any => ({ id: "c1", tenantId: "t1", provider: "uala" })),
  auditCreate: vi.fn(),
  encrypt: vi.fn((): any => "enc-blob"),
}));

vi.mock("@/lib/apikey", () => ({ authenticateApiKey: m.auth }));
vi.mock("@/lib/ratelimit", () => ({ rateLimit: m.rateLimit, rateLimitKey: () => "k" }));
vi.mock("@/lib/audit", () => ({ audit: vi.fn(async () => m.auditCreate()) }));
vi.mock("@plata-neta/db", () => ({
  prisma: {
    pspCredential: { upsert: m.upsert },
    auditLog: { create: m.auditCreate },
  },
  encryptJson: m.encrypt,
}));
vi.mock("@plata-neta/providers", () => ({
  isProviderId: (p: string) => ["mercadopago", "uala", "naranjax", "modo", "ripio"].includes(p),
}));

import { POST } from "./route";

const post = (body: unknown, auth = "sk_test_x") =>
  POST(req("http://localhost:4500/api/v1/credentials", { method: "POST", body, auth }));

describe("POST /api/v1/credentials", () => {
  beforeEach(() => vi.clearAllMocks());

  it("401 sin auth", async () => {
    m.auth.mockResolvedValue(null);
    expect((await post({ provider: "uala", accessToken: "x" }, "")).status).toBe(401);
  });

  it("400 sin provider/accessToken", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    expect((await post({ provider: "uala" })).status).toBe(400);
  });

  it("400 provider desconocido", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    expect((await post({ provider: "otro", accessToken: "x" })).status).toBe(400);
  });

  it("upsert cifrado + audit + nunca devuelve el secreto", async () => {
    m.auth.mockResolvedValue({ tenantId: "t1", keyId: "k1" });
    const res = await post({ provider: "uala", accessToken: "secret-token", cvu: "123" });
    expect(res.status).toBe(201);
    expect(m.encrypt).toHaveBeenCalled();
    const body = await res.json();
    expect(JSON.stringify(body)).not.toContain("secret-token");
    expect(m.auditCreate).toHaveBeenCalled();
  });
});
