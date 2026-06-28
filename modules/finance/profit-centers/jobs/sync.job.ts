export const profitCentersSyncJob = {
  name: "finance/profit-centers.sync",
  queue: "finance-profit-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
