export const cdcSyncJob = {
  name: "data-platform/cdc.sync",
  queue: "data-platform-cdc",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
