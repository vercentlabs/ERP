export const stockAdjustmentsRecomputeJob = {
  name: "inventory/stock-adjustments.recompute",
  queue: "inventory-stock-adjustments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
