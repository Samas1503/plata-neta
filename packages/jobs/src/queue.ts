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
