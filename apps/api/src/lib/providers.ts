import { mercadoPagoProvider, registerProvider } from "@plata-neta/providers";
import type { ProviderCredentials } from "@plata-neta/providers";

let registered = false;

export function ensureProvidersRegistered(): void {
  if (!registered) {
    registerProvider(mercadoPagoProvider);
    registered = true;
  }
}

export function toCredentials(plain: {
  accessToken?: string;
  webhookSecret?: string;
  baseUrl?: string;
}): ProviderCredentials {
  const { accessToken, webhookSecret, ...extra } = plain;
  if (!accessToken) throw new Error("credential missing accessToken");
  return { accessToken, webhookSecret, extra };
}
