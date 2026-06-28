export const shopFloorRecomputeJob = {
  name: "manufacturing/shop-floor.recompute",
  queue: "manufacturing-shop-floor",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
