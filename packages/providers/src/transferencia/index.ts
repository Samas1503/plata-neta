import { createCvuAdapter } from "../cvu-adapter";

// Providers de recepción 0% por transferencia (CVU/CBU/alias del comercio).
// No hay cargo de % — la plata entra directo a la cuenta del comercio.
// createIntent genera la instrucción de pago con los datos del comercio;
// getStatus/webhook se cablea por-provider según doc/API de cada uno
// (los bancos sin API pública se concilian por extracto/ledger).

// ===== Billeteras virtuales (CVU) =====
export const brubankProvider = createCvuAdapter({
  id: "brubank",
  apiBaseUrl: "https://api.brubank.com",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-brubank-signature",
});

export const personalpayProvider = createCvuAdapter({
  id: "personalpay",
  apiBaseUrl: "https://api.personal.com.ar/pay",
  statusPath: "/v1/payments/{id}",
  signHeader: "x-personalpay-signature",
});

export const cuentadniProvider = createCvuAdapter({
  id: "cuentadni",
  apiBaseUrl: "https://api.bancoprovincia.com.ar/cuentadni",
  statusPath: "/v1/payments/{id}",
  signHeader: "x-cuentadni-signature",
});

export const prexProvider = createCvuAdapter({
  id: "prex",
  apiBaseUrl: "https://api.prex.com.ar",
  statusPath: "/v1/payments/{id}",
  signHeader: "x-prex-signature",
});

export const bnaplusProvider = createCvuAdapter({
  id: "bnaplus",
  apiBaseUrl: "https://api.bna.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-bnaplus-signature",
});

// ===== Bancos (CBU/alias — recepción directa) =====
export const galiciaProvider = createCvuAdapter({
  id: "galicia",
  apiBaseUrl: "https://api.galicia.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-galicia-signature",
});

export const santanderProvider = createCvuAdapter({
  id: "santander",
  apiBaseUrl: "https://api.santander.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-santander-signature",
});

export const bbvaProvider = createCvuAdapter({
  id: "bbva",
  apiBaseUrl: "https://api.bbva.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-bbva-signature",
});

export const macroProvider = createCvuAdapter({
  id: "macro",
  apiBaseUrl: "https://api.macro.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-macro-signature",
});

export const bnaProvider = createCvuAdapter({
  id: "bna",
  apiBaseUrl: "https://api.bna.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-bna-signature",
});

export const provinciaProvider = createCvuAdapter({
  id: "provincia",
  apiBaseUrl: "https://api.bancoprovincia.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-provincia-signature",
});

export const credicoopProvider = createCvuAdapter({
  id: "credicoop",
  apiBaseUrl: "https://api.credicoop.com.ar",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-credicoop-signature",
});
