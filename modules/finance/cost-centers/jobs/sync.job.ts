export const costCentersSyncJob = {
  name: "finance/cost-centers.sync",
  queue: "finance-cost-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
