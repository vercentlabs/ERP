export const periodCloseSyncJob = {
  name: "finance/period-close.sync",
  queue: "finance-period-close",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
