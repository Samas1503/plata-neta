import { describe, expect, it } from "vitest";
import { getProvider, isProviderId, PROVIDER_IDS, registerAllProviders } from "./index";

describe("registerAllProviders", () => {
  it("cada ProviderId resuelve un adaptador registrado", () => {
    registerAllProviders();
    for (const id of PROVIDER_IDS) {
      expect(getProvider(id).id).toBe(id);
    }
  });

  it("17 providers registrados", () => {
    expect(PROVIDER_IDS).toHaveLength(17);
  });

  it("isProviderId acepta nuevos ids y rechaza desconocidos", () => {
    expect(isProviderId("brubank")).toBe(true);
    expect(isProviderId("credicoop")).toBe(true);
    expect(isProviderId("westernunion")).toBe(false);
  });

  it("adaptador de transferencia genera instrucción con cvu/cbu/alias del comercio", async () => {
    registerAllProviders();
    const result = await getProvider("galicia").createIntent(
      { tenantId: "t1", idempotencyKey: "k1", amountCents: 50000n, currency: "ARS" },
      { accessToken: "x", extra: { cbu: "0000000000000000000000", alias: "demo.galicia" } },
    );
    expect(result.status).toBe("PENDING");
    expect(result.paymentDetails?.["cbu"]).toBe("0000000000000000000000");
    expect(result.paymentDetails?.["alias"]).toBe("demo.galicia");
  });
});
