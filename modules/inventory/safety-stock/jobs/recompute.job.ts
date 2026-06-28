export const safetyStockRecomputeJob = {
  name: "inventory/safety-stock.recompute",
  queue: "inventory-safety-stock",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
