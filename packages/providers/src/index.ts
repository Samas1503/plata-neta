export * from "./types";
export * from "./registry";
export { mercadoPagoProvider } from "./mercadopago/index";
export { ualaProvider } from "./uala/index";
export { naranjaxProvider } from "./naranjax/index";
export { modoProvider } from "./modo/index";
export { createCvuAdapter } from "./cvu-adapter";
export { ripioProvider } from "./ripio/index";
export {
  brubankProvider,
  personalpayProvider,
  cuentadniProvider,
  prexProvider,
  bnaplusProvider,
  galiciaProvider,
  santanderProvider,
  bbvaProvider,
  macroProvider,
  bnaProvider,
  provinciaProvider,
  credicoopProvider,
} from "./transferencia/index";

import { mercadoPagoProvider } from "./mercadopago/index";
import { ualaProvider } from "./uala/index";
import { naranjaxProvider } from "./naranjax/index";
import { modoProvider } from "./modo/index";
import { ripioProvider } from "./ripio/index";
import {
  brubankProvider,
  personalpayProvider,
  cuentadniProvider,
  prexProvider,
  bnaplusProvider,
  galiciaProvider,
  santanderProvider,
  bbvaProvider,
  macroProvider,
  bnaProvider,
  provinciaProvider,
  credicoopProvider,
} from "./transferencia/index";
import { registerProvider } from "./registry";

// Registra todos los adaptadores — llamar en bootstrap de api y worker.
export function registerAllProviders(): void {
  for (const p of [
    mercadoPagoProvider,
    ualaProvider,
    naranjaxProvider,
    modoProvider,
    ripioProvider,
    brubankProvider,
    personalpayProvider,
    cuentadniProvider,
    prexProvider,
    bnaplusProvider,
    galiciaProvider,
    santanderProvider,
    bbvaProvider,
    macroProvider,
    bnaProvider,
    provinciaProvider,
    credicoopProvider,
  ]) {
    registerProvider(p);
  }
}
