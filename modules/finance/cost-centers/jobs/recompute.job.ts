export const costCentersRecomputeJob = {
  name: "finance/cost-centers.recompute",
  queue: "finance-cost-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
