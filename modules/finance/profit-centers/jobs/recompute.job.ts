export const profitCentersRecomputeJob = {
  name: "finance/profit-centers.recompute",
  queue: "finance-profit-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
