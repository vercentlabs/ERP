export const dataLakeSyncJob = {
  name: "data-platform/data-lake.sync",
  queue: "data-platform-data-lake",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
