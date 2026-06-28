export const dataRetentionSyncJob = {
  name: "compliance/data-retention.sync",
  queue: "compliance-data-retention",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
