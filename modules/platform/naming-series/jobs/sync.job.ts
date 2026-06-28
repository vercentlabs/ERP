export const namingSeriesSyncJob = {
  name: "platform/naming-series.sync",
  queue: "platform-naming-series",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
