export const deduplicationSyncJob = {
  name: "master-data/deduplication.sync",
  queue: "master-data-deduplication",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
