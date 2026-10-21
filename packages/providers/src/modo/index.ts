import { createCvuAdapter } from "../cvu-adapter";

// MODO — cobro por QR PCT. El QR es DEL COMERCIO (credentials.extra.qrPayload),
// nunca emitido por plata-neta (RULES.MD §8 — evita función "aceptación").
export const modoProvider = createCvuAdapter({
  id: "modo",
  apiBaseUrl: "https://api.modo.com.ar",
  statusPath: "/v1/operations/{id}",
  signHeader: "x-modo-signature",
});
