import {
  mercadoPagoProvider,
  modoProvider,
  naranjaxProvider,
  registerProvider,
  ualaProvider,
} from "@plata-neta/providers";
import type { ProviderCredentials } from "@plata-neta/providers";

let registered = false;

export function ensureProvidersRegistered(): void {
  if (!registered) {
    registerProvider(mercadoPagoProvider);
    registerProvider(ualaProvider);
    registerProvider(naranjaxProvider);
    registerProvider(modoProvider);
    registered = true;
  }
}

export function toCredentials(plain: {
  accessToken?: string;
  webhookSecret?: string;
  [key: string]: unknown;
}): ProviderCredentials {
  const { accessToken, webhookSecret, ...rest } = plain;
  if (!accessToken) throw new Error("credential missing accessToken");
  const extra = Object.fromEntries(
    Object.entries(rest).filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;
  return { accessToken, webhookSecret: webhookSecret as string | undefined, extra };
}
