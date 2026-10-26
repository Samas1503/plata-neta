import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { extractDataId, verifyMercadoPagoSignature } from "./signature";
import { mapMpStatus } from "./status";

const SECRET = "test-webhook-secret";

function sign(rawBody: string, requestId: string, ts: string) {
  const dataId = extractDataId(rawBody)!;
  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  return createHmac("sha256", SECRET).update(manifest).digest("hex");
}

describe("mercadopago webhook signature", () => {
  const body = JSON.stringify({ action: "payment.updated", data: { id: "12345" }, id: 999 });
  const requestId = "req-abc";
  const ts = String(Math.floor(Date.now() / 1000));
  const validHeaders = {
    "x-signature": `ts=${ts},v1=${sign(body, requestId, ts)}`,
    "x-request-id": requestId,
  };

  it("accepts a valid signature", () => {
    expect(verifyMercadoPagoSignature(body, validHeaders, SECRET)).toBe(true);
  });

  it("rejects a tampered body", () => {
    const tampered = JSON.stringify({ data: { id: "99999" } });
    expect(verifyMercadoPagoSignature(tampered, validHeaders, SECRET)).toBe(false);
  });

  it("rejects a wrong v1", () => {
    expect(
      verifyMercadoPagoSignature(
        body,
        { "x-signature": `ts=${ts},v1=deadbeef`, "x-request-id": requestId },
        SECRET,
      ),
    ).toBe(false);
  });

  it("rejects missing headers", () => {
    expect(verifyMercadoPagoSignature(body, {}, SECRET)).toBe(false);
    expect(verifyMercadoPagoSignature(body, { "x-request-id": requestId }, SECRET)).toBe(false);
  });

  it("rejects wrong secret", () => {
    expect(verifyMercadoPagoSignature(body, validHeaders, "other-secret")).toBe(false);
  });
});

describe("mercadopago status mapping", () => {
  it("maps approved to SUCCEEDED", () => {
    expect(mapMpStatus("approved")).toBe("SUCCEEDED");
  });

  it("maps pending/in_process/authorized to PROCESSING", () => {
    expect(mapMpStatus("pending")).toBe("PROCESSING");
    expect(mapMpStatus("in_process")).toBe("PROCESSING");
    expect(mapMpStatus("authorized")).toBe("PROCESSING");
  });

  it("maps rejected/cancelled to FAILED", () => {
    expect(mapMpStatus("rejected")).toBe("FAILED");
    expect(mapMpStatus("cancelled")).toBe("FAILED");
  });

  it("maps refunded/charged_back to REVERSED", () => {
    expect(mapMpStatus("refunded")).toBe("REVERSED");
    expect(mapMpStatus("charged_back")).toBe("REVERSED");
  });
});
