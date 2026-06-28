export const consolidationSyncJob = {
  name: "finance/consolidation.sync",
  queue: "finance-consolidation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
