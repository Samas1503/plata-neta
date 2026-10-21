// Adaptador Ripio — SOLO recepción de stablecoins (RULES.MD §8 / debate psp-boundary).
// Restricciones duras:
//  - credenciales scope "crear intent + leer estado" — este adaptador NUNCA
//    llama endpoints de movimiento (withdraw/transfer/send).
//  - off-ramp = standing instruction configurada por el comercio en Ripio.
//  - payouts cripto: fuera del MVP (lanza error explícito).
//  - intents registran network + txHash en metadata/paymentDetails.

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
  WebhookHeaders,
} from "../types";

const NETWORKS = new Set(["ethereum", "polygon", "arbitrum", "optimism", "base", "tron", "solana"]);
const ASSETS = new Set(["USDT", "USDC", "DAI"]);

export const ripioProvider: PaymentProvider = {
  id: "ripio",

  async createIntent(input: CreateIntentInput, credentials: ProviderCredentials): Promise<PaymentIntentResult> {
    const network = (input.metadata?.["network"] as string)?.toLowerCase();
    const asset = ((input.metadata?.["asset"] as string) ?? "USDC").toUpperCase();
    if (!network || !NETWORKS.has(network)) {
      throw new PaymentFailedError(`ripio: network inválida — usar ${[...NETWORKS].join(", ")}`);
    }
    if (!ASSETS.has(asset)) {
      throw new PaymentFailedError(`ripio: asset inválido — usar ${[...ASSETS].join(", ")}`);
    }

    // Depósito: el intent expone la address del comercio (de credentials.extra).
    const depositAddress = credentials.extra?.["depositAddress"];
    if (!depositAddress) {
      throw new PaymentFailedError("ripio: credential sin depositAddress");
    }
    const ref = `ripio-${input.idempotencyKey}`;
    return {
      externalRef: ref,
      status: "PENDING",
      paymentDetails: {
        depositAddress,
        network,
        asset,
        amount: (Number(input.amountCents) / 100).toFixed(2),
        reference: ref,
        // Off-ramp: standing instruction del comercio en Ripio — plata-neta
        // solo muestra el depósito; la liquidación la ejecuta Ripio.
        offRamp: "standing_instruction",
      },
    };
  },

  async getStatus(externalRef: string, credentials: ProviderCredentials): Promise<TxStatus> {
    // Solo lectura de estado del depósito — nunca movimiento.
    const base = credentials.extra?.["baseUrl"] ?? "https://api.ripio.com";
    const res = await fetch(`${base}/v1/deposits/${externalRef}`, {
      headers: { Authorization: `Bearer ${credentials.accessToken}` },
    });
    if (!res.ok) throw new PaymentFailedError(`ripio getStatus ${res.status}`);
    const data = (await res.json()) as { status?: string; txHash?: string };
    switch (data.status) {
      case "confirmed":
      case "completed":
        return "SUCCEEDED";
      case "detected":
      case "confirming":
        return "PROCESSING";
      case "expired":
        return "EXPIRED";
      case "reverted":
        return "REVERSED";
      default:
        return "FAILED";
    }
  },

  async payout(_input: PayoutInput, _credentials: ProviderCredentials): Promise<PayoutResult> {
    // 🔴 Regla dura: payouts cripto fuera del MVP — nunca llamar movimiento.
    throw new PaymentFailedError("ripio payout: fuera del MVP (Cat. 3 CNV)");
  },

  verifySignature(rawBody: string, headers: WebhookHeaders): boolean {
    const secret = process.env.RIPIO_WEBHOOK_SECRET;
    if (!secret) return false;
    const sig = headers["x-ripio-signature"];
    const signature = Array.isArray(sig) ? sig[0] : sig;
    if (!signature) return false;
    const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
    const a = Buffer.from(signature, "utf8");
    const b = Buffer.from(expected, "utf8");
    return a.length === b.length && timingSafeEqual(a, b);
  },

  parseWebhook(rawBody: string): ParsedWebhook {
    const body = JSON.parse(rawBody) as {
      id?: string | number;
      event_id?: string | number;
      data?: { id?: string | number; tx_hash?: string; network?: string };
    };
    const externalRef = String(body.data?.id ?? "");
    if (!externalRef) throw new PaymentFailedError("ripio webhook: missing data.id");
    return {
      eventId: String(body.id ?? body.event_id ?? externalRef),
      externalRef,
      status: "PROCESSING",
      raw: body,
    };
  },
};
