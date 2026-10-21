// Nombres de jobs y payloads tipados.
export const JOBS = {
  WEBHOOK_PROCESS: "webhook.process",
  RECONCILE_RUN: "reconcile.run",
  SUBSCRIPTION_BILL: "subscription.bill",
  INTENT_EXPIRE: "intent.expire",
  PAYOUT_EXECUTE: "payout.execute",
} as const;

export type JobName = (typeof JOBS)[keyof typeof JOBS];

export interface WebhookProcessData {
  webhookEventId: string;
}

export interface ReconcileRunData {
  tenantId?: string; // omit → todos los tenants
}

export interface SubscriptionBillData {
  tenantId?: string;
}

export interface IntentExpireData {
  intentId?: string; // omit → sweep de vencidos
}

export interface PayoutExecuteData {
  payoutId?: string; // omit → sweep de PROCESSING pendientes
}

export type JobData =
  | { name: typeof JOBS.WEBHOOK_PROCESS; data: WebhookProcessData }
  | { name: typeof JOBS.RECONCILE_RUN; data: ReconcileRunData }
  | { name: typeof JOBS.SUBSCRIPTION_BILL; data: SubscriptionBillData }
  | { name: typeof JOBS.INTENT_EXPIRE; data: IntentExpireData }
  | { name: typeof JOBS.PAYOUT_EXECUTE; data: PayoutExecuteData };
