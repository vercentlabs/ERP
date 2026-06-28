export const productionOrdersRecomputeJob = {
  name: "manufacturing/production-orders.recompute",
  queue: "manufacturing-production-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
