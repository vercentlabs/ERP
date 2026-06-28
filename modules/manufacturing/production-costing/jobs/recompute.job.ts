export const productionCostingRecomputeJob = {
  name: "manufacturing/production-costing.recompute",
  queue: "manufacturing-production-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
