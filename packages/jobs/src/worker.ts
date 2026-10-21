import { Worker } from "bullmq";
import { connection } from "./redis";
import { JOBS } from "./types";
import { expireIntents, processWebhook, reconcile } from "./processors";
import { billSubscription } from "./subscription";

const worker = new Worker(
  "plata-neta",
  async (job) => {
    switch (job.name) {
      case JOBS.WEBHOOK_PROCESS:
        return processWebhook(job.data);
      case JOBS.INTENT_EXPIRE:
        return expireIntents(job.data);
      case JOBS.RECONCILE_RUN:
        return reconcile();
      case JOBS.SUBSCRIPTION_BILL:
        return billSubscription(job.data);
      default:
        throw new Error(`unknown job: ${job.name}`);
    }
  },
  { connection, concurrency: 5 },
);

worker.on("completed", (job) => console.log(`[jobs] ${job.name} ✓`));
worker.on("failed", (job, err) => console.error(`[jobs] ${job?.name} ✗`, err.message));

console.log("[jobs] worker up — plata-neta queue");
