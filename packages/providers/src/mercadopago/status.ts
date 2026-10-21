import type { TxStatus } from "@plata-neta/core";

// Mapa de estados de Mercado Pago (/v1/payments) → TxStatus interno.
export function mapMpStatus(mpStatus: string): TxStatus {
  switch (mpStatus) {
    case "approved":
      return "SUCCEEDED";
    case "pending":
    case "in_process":
    case "authorized":
      return "PROCESSING";
    case "rejected":
    case "cancelled":
      return "FAILED";
    case "refunded":
    case "charged_back":
      return "REVERSED";
    default:
      return "FAILED";
  }
}
