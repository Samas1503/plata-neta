import { beforeEach, describe, expect, it, vi } from "vitest";
import { req } from "../../../__tests__/helpers";

const m = vi.hoisted(() => ({
  eventFindFirst: vi.fn(),
  eventCreate: vi.fn(),
  enqueue: vi.fn(),
  verifySig: vi.fn((): any => true),
  parseWh: vi.fn((): any => ({ eventId: "e1", externalRef: "x" })),
}));

vi.mock("@/lib/providers", () => ({ ensureProvidersRegistered: vi.fn() }));
vi.mock("@plata-neta/db", () => ({
  prisma: {
    webhookEvent: { findFirst: m.eventFindFirst, create: m.eventCreate },
  },
}));
vi.mock("@plata-neta/providers", () => ({
  isProviderId: (p: string) => p === "uala",
  registerAllProviders: vi.fn(),
    getProvider: () => ({ verifySignature: m.verifySig, parseWebhook: m.parseWh }),
}));
vi.mock("@plata-neta/jobs", () => ({
  enqueue: m.enqueue,
  JOBS: { WEBHOOK_PROCESS: "webhook.process" },
}));

import { POST } from "./[provider]/route";

const call = (provider = "uala", body = {}) =>
  POST(req(`http://localhost:4500/api/webhooks/${provider}`, { method: "POST", body }),
    { params: Promise.resolve({ provider }) });

describe("POST /api/webhooks/[provider]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    m.verifySig.mockReturnValue(true);
    m.parseWh.mockReturnValue({ eventId: "e1", externalRef: "x" });
    m.eventFindFirst.mockResolvedValue(null);
    m.eventCreate.mockResolvedValue({ id: "ev1" });
  });

  it("404 provider desconocido", async () => {
    const res = await call("noexiste");
    expect(res.status).toBe(404);
  });

  it("401 firma inválida — nunca persiste ni procesa", async () => {
    m.verifySig.mockReturnValue(false);
    const res = await call();
    expect(res.status).toBe(401);
    expect(m.eventCreate).not.toHaveBeenCalled();
    expect(m.enqueue).not.toHaveBeenCalled();
  });

  it("200 dedup: eventId ya procesado no re-encola", async () => {
    m.eventFindFirst.mockResolvedValue({ id: "existing" });
    const res = await call();
    const body = await res.json();
    expect(body.deduplicated).toBe(true);
    expect(m.eventCreate).not.toHaveBeenCalled();
  });

  it("200 persiste + encola webhook.process", async () => {
    m.eventFindFirst.mockResolvedValue(null);
    m.eventCreate.mockResolvedValue({ id: "ev1" });
    const res = await call();
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.queued).toBe(true);
    expect(m.eventCreate).toHaveBeenCalled();
    expect(m.enqueue).toHaveBeenCalledWith("webhook.process", { webhookEventId: "ev1" });
  });
});
