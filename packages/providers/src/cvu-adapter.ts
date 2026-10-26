import { createHmac, timingSafeEqual } from "node:crypto";
import { PaymentFailedError, type TxStatus } from "@plata-neta/core";
import type {
  CreateIntentInput,
  ParsedWebhook,
  PaymentIntentResult,
  PaymentProvider,
  PayoutInput,
  PayoutResult,
  ProviderCredentials,
  ProviderId,
  WebhookHeaders,
} from "./types";

// Factory de adaptadores CVU/QR (Ualá, Naranja X, MODO).
// Genera la instrucción de cobro local a partir de los datos del comercio
// (cvu/alias/qr en credentials.extra) — la llamada a la API del PSP se
// cablea por-provider cuando estén las credenciales y docs reales.
interface CvuConfig {
  id: ProviderId;
  apiBaseUrl: string;
  statusPath: string; // ej. "/v1/payments/{id}"
  signHeader: string; // ej. "x-uala-signature"
}

function hmacHeaders(headers: WebhookHeaders, name: string): string | undefined {
  const v = headers[name.toLowerCase()];
  return Array.isArray(v) ? v[0] : v;
}

export function createCvuAdapter(cfg: CvuConfig): PaymentProvider {
  return {
    id: cfg.id,

    async createIntent(input: CreateIntentInput, credentials: ProviderCredentials): Promise<PaymentIntentResult> {
      // Instrucción de cobro con CVU/alias del propio comercio.
      const cvu = credentials.extra?.["cvu"] ?? credentials.extra?.["cbu"];
      const cbu = credentials.extra?.["cbu"];
      const alias = credentials.extra?.["alias"];
      const qrPayload = credentials.extra?.["qrPayload"];
      const ref = `${cfg.id.slice(0, 4)}-${input.idempotencyKey}`;
      return {
        externalRef: ref,
        status: "PENDING",
        paymentDetails: {
          cvu,
          cbu,
          alias,
          qrCode: qrPayload,
          amount: (Number(input.amountCents) / 100).toFixed(2),
          currency: input.currency,
          reference: ref,
        },
      };
    },

    async getStatus(externalRef: string, credentials: ProviderCredentials): Promise<TxStatus> {
      const base = credentials.extra?.["baseUrl"] ?? cfg.apiBaseUrl;
      const res = await fetch(`${base}${cfg.statusPath.replace("{id}", externalRef)}`, {
        headers: { Authorization: `Bearer ${credentials.accessToken}` },
      });
      if (!res.ok) throw new PaymentFailedError(`${cfg.id} getStatus ${res.status}`);
      const data = (await res.json()) as { status?: string };
      switch (data.status) {
        case "paid":
        case "approved":
        case "completed":
          return "SUCCEEDED";
        case "pending":
        case "in_process":
          return "PROCESSING";
        case "expired":
          return "EXPIRED";
        case "refunded":
        case "reversed":
          return "REVERSED";
        default:
          return "FAILED";
      }
    },

    async payout(_input: PayoutInput, _credentials: ProviderCredentials): Promise<PayoutResult> {
      throw new PaymentFailedError(`${cfg.id} payout: not implemented`);
    },

    verifySignature(rawBody: string, headers: WebhookHeaders): boolean {
      const secret = process.env[`${cfg.id.toUpperCase()}_WEBHOOK_SECRET`];
      if (!secret) return false;
      const sig = hmacHeaders(headers, cfg.signHeader);
      if (!sig) return false;
      const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
      const a = Buffer.from(sig, "utf8");
      const b = Buffer.from(expected, "utf8");
      return a.length === b.length && timingSafeEqual(a, b);
    },

    parseWebhook(rawBody: string): ParsedWebhook {
      const body = JSON.parse(rawBody) as {
        id?: string | number;
        event_id?: string | number;
        data?: { id?: string | number };
        reference?: string;
      };
      const externalRef = String(body.data?.id ?? body.reference ?? "");
      if (!externalRef) throw new PaymentFailedError(`${cfg.id} webhook: missing reference`);
      return {
        eventId: String(body.id ?? body.event_id ?? externalRef),
        externalRef,
        status: "PROCESSING",
        raw: body,
      };
    },
  };
}
