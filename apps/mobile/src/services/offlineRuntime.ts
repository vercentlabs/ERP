import { drainOfflineJobs } from "./offlineQueue";

export async function syncOfflineJobs(sender: (job: unknown) => Promise<void>) {
  for (const job of drainOfflineJobs()) await sender(job);
}
