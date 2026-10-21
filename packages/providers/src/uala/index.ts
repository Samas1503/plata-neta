import { createCvuAdapter } from "../cvu-adapter";

// Ualá — cobro por transferencia a CVU del comercio.
export const ualaProvider = createCvuAdapter({
  id: "uala",
  apiBaseUrl: "https://api.uala.com",
  statusPath: "/v1/payments/{id}",
  signHeader: "x-uala-signature",
});
