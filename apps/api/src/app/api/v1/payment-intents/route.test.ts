import { beforeEach, describe, expect, it, vi } from "vitest";
import { req } from "../../../../__tests__/helpers";

const m = vi.hoisted(() => ({
  auth: vi.fn(),
  rateLimit: vi.fn(() => ({ ok: true, retryAfter: 0 })),
  intentFindUnique: vi.fn(),
  intentFindMany: vi.fn(() => []),
  intentCreate: vi.fn(),
  intentUpdate: vi.fn(),
  ledgerCreate: vi.fn(),
  credFindUnique: vi.fn(),
  createIntent: vi.fn(),
}));

vi.mock("@/lib/apikey", () => ({ authenticateApiKey: m.auth }));
vi.mock("@/lib/ratelimit", () => ({
  rateLimit: m.rateLimit,
  rateLimitKey: () => "k",
}));
vi.mock("@plata-neta/db", () => ({
  prisma: {
    tenant: { findUnique: vi.fn(() => ({ id: "t1", status: "ACTIVE" })) },
    paymentIntent: {
      findUnique: m.intentFindUnique,
      findMany: m.intentFindMany,
      create: m.intentCreate,
      update: m.intentUpdate,
    },
    pspCredential: { findUnique: m.credFindUnique },
    ledgerEntry: { create: m.ledgerCreate },
    $transaction: (fn: (tx: unknown) => Promise<unknown>) =>
      fn({
        paymentIntent: { create: m.intentCreate, update: m.intentUpdate },
        ledgerEntry: { create: m.ledgerCreate },
      }),
  },
  decryptJson: () => ({ accessToken: "tok" }),
}));
vi.mock("@plata-neta/providers", () => ({
  isProviderId: () => true,
  getProvider: () => ({
    createIntent: m.createIntent,
  }),
  mercadoPagoProvider: { id: "mercadopago" },
  ualaProvider: { id: "uala" },
  naranjaxProvider: { id: "naranjax" },
  modoProvider: { id: "modo" },
  ripioProvider: { id: "ripio" },
  registerProvider: vi.fn(),
}));

import { GET, POST } from "./route";

const AUTH = { tenantId: "t1", keyId: "k1" };
const post = (body: unknown, auth = "sk_test_x") =>
  POST(req("http://localhost:4500/api/v1/payment-intents", { method: "POST", body, auth }));

describe("POST /api/v1/payment-intents", () => {
  beforeEach(() => vi.clearAllMocks());

  it("401 sin auth", async () => {
    m.auth.mockResolvedValue(null);
    const res = await post({ amountCents: 100, idempotencyKey: "a" }, "");
    expect(res.status).toBe(401);
  });

  it("400 sin idempotencyKey", async () => {
    m.auth.mockResolvedValue(AUTH);
    const res = await post({ amountCents: 100 });
    expect(res.status).toBe(400);
  });

  it("400 metadata anidada", async () => {
    m.auth.mockResolvedValue(AUTH);
    const res = await post({ amountCents: 100, idempotencyKey: "a", metadata: { deep: { x: 1 } } });
    expect(res.status).toBe(400);
  });

  it("dedup: mismo idempotencyKey devuelve intent existente", async () => {
    m.auth.mockResolvedValue(AUTH);
    m.intentFindUnique.mockResolvedValue({ id: "i1", status: "PENDING" });
    const res = await post({ amountCents: 100, idempotencyKey: "dup" });
    const body = await res.json();
    expect(body.duplicated).toBe(true);
    expect(body.intent.id).toBe("i1");
  });

  it("crea intent + ledger pending", async () => {
    m.auth.mockResolvedValue(AUTH);
    m.intentFindUnique.mockResolvedValue(null);
    m.credFindUnique.mockResolvedValue({ id: "c1", encryptedKeys: "enc" });
    m.intentCreate.mockResolvedValue({ id: "i2", status: "PENDING" });
    m.createIntent.mockResolvedValue({ externalRef: "ext-1", status: "PENDING", paymentDetails: {} });

    const res = await post({ provider: "uala", amountCents: 5000, idempotencyKey: "n1" });
    expect(res.status).toBe(201);
    expect(m.intentCreate).toHaveBeenCalled();
    expect(m.ledgerCreate).toHaveBeenCalled(); // entriesForCollectionPending
  });

  it("sin credencial del tenant → error", async () => {
    m.auth.mockResolvedValue(AUTH);
    m.intentFindUnique.mockResolvedValue(null);
    m.credFindUnique.mockResolvedValue(null);
    const res = await post({ amountCents: 5000, idempotencyKey: "n2" });
    expect([400, 404, 422, 500]).toContain(res.status); // debe fallar, no crashear
  });
});

describe("GET /api/v1/payment-intents", () => {
  it("401 sin auth", async () => {
    m.auth.mockResolvedValue(null);
    const res = await GET(req("http://localhost:4500/api/v1/payment-intents"));
    expect(res.status).toBe(401);
  });
  it("lista intents del tenant", async () => {
    m.auth.mockResolvedValue(AUTH);
    m.intentFindMany.mockResolvedValue([{ id: "i1" }, { id: "i2" }]);
    const res = await GET(req("http://localhost:4500/api/v1/payment-intents", { auth: "sk_test_x" }));
    const body = await res.json();
    expect(body.intents).toHaveLength(2);
  });
});
