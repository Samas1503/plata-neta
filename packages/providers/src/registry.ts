import { PROVIDER_IDS, type PaymentProvider, type ProviderId } from "./types";

const adapters = new Map<ProviderId, PaymentProvider>();

export function registerProvider(provider: PaymentProvider): void {
  adapters.set(provider.id, provider);
}

export function getProvider(id: ProviderId): PaymentProvider {
  const provider = adapters.get(id);
  if (!provider) {
    throw new Error(
      `provider adapter not registered: ${id} (implement in packages/providers/src/${id}/)`,
    );
  }
  return provider;
}

export function isProviderId(value: string): value is ProviderId {
  return (PROVIDER_IDS as readonly string[]).includes(value);
}
