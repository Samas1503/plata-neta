// Errores de dominio tipados (RULES.MD §4).

export class DomainError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "DomainError";
    this.code = code;
  }
}

export class PaymentFailedError extends DomainError {
  constructor(message: string) {
    super("PAYMENT_FAILED", message);
    this.name = "PaymentFailedError";
  }
}

export class InsufficientFundsError extends DomainError {
  constructor(message: string) {
    super("INSUFFICIENT_FUNDS", message);
    this.name = "InsufficientFundsError";
  }
}

export class DuplicateOperationError extends DomainError {
  constructor(idempotencyKey: string) {
    super("DUPLICATE_OPERATION", `operation already exists: ${idempotencyKey}`);
    this.name = "DuplicateOperationError";
  }
}

export class InvalidWebhookSignatureError extends DomainError {
  constructor(provider: string) {
    super("INVALID_WEBHOOK_SIGNATURE", `invalid webhook signature: ${provider}`);
    this.name = "InvalidWebhookSignatureError";
  }
}

export class InvalidStateTransitionError extends DomainError {
  constructor(from: string, to: string) {
    super("INVALID_STATE_TRANSITION", `${from} -> ${to}`);
    this.name = "InvalidStateTransitionError";
  }
}
