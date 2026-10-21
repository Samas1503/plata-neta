import { Queue } from "bullmq";
import { connection } from "./redis";
import type { JobData, JobName } from "./types";

export const queue = new Queue<JobData["data"]>("plata-neta", {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});

export async function enqueue(name: JobName, data: JobData["data"], delay = 0) {
  return queue.add(name, data, { delay });
}

// Jobs recurrentes — registrar una sola vez (idempotente por schedulerId).
export async function upsertSchedulers() {
  await queue.upsertJobScheduler("reconcile-every-15min", { pattern: "*/15 * * * *" }, { name: "reconcile.run", data: {} });
  await queue.upsertJobScheduler("expire-every-5min", { pattern: "*/5 * * * *" }, { name: "intent.expire", data: {} });
  // Facturación: día 1 de cada mes a las 03:00.
  await queue.upsertJobScheduler("subscription-monthly", { pattern: "0 3 1 * *" }, { name: "subscription.bill", data: {} });
}
