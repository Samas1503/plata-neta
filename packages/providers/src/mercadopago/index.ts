// Adaptador Mercado Pago (sandbox) — implementa PaymentProvider.
// Cobro por transferencia/QR vía /v1/payments; payout no soportado en Fase 1.

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
import { mapMpStatus } from "./status";
import { extractDataId, verifyMercadoPagoSignature } from "./signature";

const DEFAULT_BASE_URL = "https://api.mercadopago.com";

interface MpPayment {
  id: number;
  status: string;
  transaction_amount?: number;
  point_of_interaction?: {
    transaction_data?: { qr_code?: string; ticket_url?: string };
  };
}

export const mercadoPagoProvider: PaymentProvider = {
  id: "mercadopago",

  async createIntent(
    input: CreateIntentInput,
    credentials: ProviderCredentials,
  ): Promise<PaymentIntentResult> {
    const baseUrl =
      credentials.extra?.["baseUrl"] ??
      process.env.MP_API_BASE_URL ??
      DEFAULT_BASE_URL;

    const res = await fetch(`${baseUrl}/v1/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": input.idempotencyKey,
      },
      body: JSON.stringify({
        transaction_amount: Number(input.amountCents) / 100,
        description:
          (input.metadata?.["description"] as string) ??
          `Cobro plata-neta ${input.tenantId}`,
        payment_method_id:
          (input.metadata?.["paymentMethodId"] as string) ?? "bank_transfer",
        external_reference: input.idempotencyKey,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new PaymentFailedError(`mercadopago createIntent ${res.status}: ${body}`);
    }

    const payment = (await res.json()) as MpPayment;
    return {
      externalRef: String(payment.id),
      status: mapMpStatus(payment.status),
      paymentDetails: {
        qrCode: payment.point_of_interaction?.transaction_data?.qr_code,
        ticketUrl: payment.point_of_interaction?.transaction_data?.ticket_url,
      },
    };
  },

  async getStatus(
    externalRef: string,
    credentials: ProviderCredentials,
  ): Promise<TxStatus> {
    const baseUrl =
      credentials.extra?.["baseUrl"] ??
      process.env.MP_API_BASE_URL ??
      DEFAULT_BASE_URL;
    const res = await fetch(`${baseUrl}/v1/payments/${externalRef}`, {
      headers: { Authorization: `Bearer ${credentials.accessToken}` },
    });
    if (!res.ok) {
      throw new PaymentFailedError(`mercadopago getStatus ${res.status}`);
    }
    const payment = (await res.json()) as MpPayment;
    return mapMpStatus(payment.status);
  },

  async payout(_input: PayoutInput, _credentials: ProviderCredentials): Promise<PayoutResult> {
    // Fase 2 — payouts MP. Fuera de alcance de Fase 1.
    throw new PaymentFailedError("mercadopago payout: not implemented (Fase 2)");
  },

  verifySignature(rawBody: string, headers: WebhookHeaders): boolean {
    const secret = process.env.MP_WEBHOOK_SECRET;
    if (!secret) return false;
    return verifyMercadoPagoSignature(rawBody, headers, secret);
  },

  parseWebhook(rawBody: string): ParsedWebhook {
    const body = JSON.parse(rawBody) as {
      id?: number | string;
      action?: string;
      type?: string;
      data?: { id?: unknown };
    };
    const dataId = extractDataId(rawBody);
    if (!dataId) throw new PaymentFailedError("mercadopago webhook: missing data.id");
    return {
      eventId: String(body.id ?? dataId),
      externalRef: dataId,
      status: "PROCESSING", // status real se consulta via getStatus (MP no lo manda en el webhook)
      raw: body,
    };
  },
};
