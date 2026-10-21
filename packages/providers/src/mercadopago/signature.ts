import { createHmac, timingSafeEqual } from "node:crypto";
import type { WebhookHeaders } from "../types";

// Verificación x-signature de Mercado Pago:
//   x-signature: "ts=<ts>,v1=<hmac>"
//   manifest:    "id:<data.id>;request-id:<x-request-id>;ts:<ts>;"
//   v1 = HMAC-SHA256(secret, manifest)

function header(headers: WebhookHeaders, name: string): string | undefined {
  const value = headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

export function extractDataId(rawBody: string): string | undefined {
  try {
    const body = JSON.parse(rawBody) as { data?: { id?: unknown }; id?: unknown };
    const id = body.data?.id ?? body.id;
    return id == null ? undefined : String(id);
  } catch {
    return undefined;
  }
}

export function verifyMercadoPagoSignature(
  rawBody: string,
  headers: WebhookHeaders,
  secret: string,
): boolean {
  const xSignature = header(headers, "x-signature");
  const xRequestId = header(headers, "x-request-id");
  if (!xSignature || !xRequestId) return false;

  const parts = Object.fromEntries(
    xSignature.split(",").map((kv) => {
      const i = kv.indexOf("=");
      return [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
    }),
  );
  const ts = parts["ts"];
  const v1 = parts["v1"];
  const dataId = extractDataId(rawBody);
  if (!ts || !v1 || !dataId) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");
  const a = Buffer.from(v1, "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
