// Interfaz PaymentProvider: todo PSP se integra detrás de este contrato.
// La lógica de negocio nunca llama SDKs de PSP directamente (RULES.MD §4).

import type { Currency, TxStatus } from "@plata-neta/core";

export const PROVIDER_IDS = [
  "mercadopago",
  "modo",
  "uala",
  "naranjax",
  "ripio",
] as const;

export type ProviderId = (typeof PROVIDER_IDS)[number];

export interface CreateIntentInput {
  tenantId: string;
  idempotencyKey: string;
  amountCents: bigint;
  currency: Currency;
  // Datos para armar el intent: alias/CVU receptor del comercio, descripción, etc.
  metadata?: Record<string, unknown> | undefined;
}

export interface PaymentIntentResult {
  externalRef: string;
  status: TxStatus;
  // Datos para que el pagador ejecute: alias, QR payload, wallet address, deep link.
  paymentDetails?: Record<string, unknown>;
}

export interface PayoutInput {
  tenantId: string;
  idempotencyKey: string;
  payeeRef: string; // CVU, alias o wallet address
  amountCents: bigint;
  currency: Currency;
}

export interface PayoutResult {
  externalRef: string;
  status: TxStatus;
}

export interface ParsedWebhook {
  eventId: string;
  externalRef: string;
  status: TxStatus;
  // Payload crudo ya validado por verifySignature en la capa llamante.
  raw: unknown;
}

export interface PaymentProvider {
  readonly id: ProviderId;

  createIntent(
    input: CreateIntentInput,
    credentials: ProviderCredentials,
  ): Promise<PaymentIntentResult>;

  getStatus(
    externalRef: string,
    credentials: ProviderCredentials,
  ): Promise<TxStatus>;

  payout(
    input: PayoutInput,
    credentials: ProviderCredentials,
  ): Promise<PayoutResult>;

  // Verificación ANTES de procesar (RULES.MD §2). Inválida → false, nunca procesar.
  verifySignature(rawBody: string, headers: WebhookHeaders): boolean;

  parseWebhook(rawBody: string): ParsedWebhook;
}

export type WebhookHeaders = Record<string, string | string[] | undefined>;

// Credenciales del PSP *del comercio* — nunca de plata-neta (RULES.MD §8).
export interface ProviderCredentials {
  accessToken: string;
  webhookSecret?: string | undefined;
  extra?: Record<string, string> | undefined;
}
