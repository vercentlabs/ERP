export type OfflineJob = {
  id: string;
  type: string;
  payload: unknown;
};

const jobs: OfflineJob[] = [];

export function enqueueOfflineJob(job: OfflineJob) {
  jobs.push(job);
}

export function drainOfflineJobs() {
  return jobs.splice(0, jobs.length);
}
