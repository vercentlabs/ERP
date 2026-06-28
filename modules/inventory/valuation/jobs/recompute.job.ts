export const valuationRecomputeJob = {
  name: "inventory/valuation.recompute",
  queue: "inventory-valuation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
