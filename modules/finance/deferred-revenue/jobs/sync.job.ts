export const deferredRevenueSyncJob = {
  name: "finance/deferred-revenue.sync",
  queue: "finance-deferred-revenue",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
