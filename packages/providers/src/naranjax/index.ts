import { createCvuAdapter } from "../cvu-adapter";

// Naranja X — cobro por transferencia a CVU del comercio.
export const naranjaxProvider = createCvuAdapter({
  id: "naranjax",
  apiBaseUrl: "https://api.naranjax.com",
  statusPath: "/v1/transfers/{id}",
  signHeader: "x-naranjax-signature",
});
