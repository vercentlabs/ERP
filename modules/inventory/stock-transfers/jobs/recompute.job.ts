export const stockTransfersRecomputeJob = {
  name: "inventory/stock-transfers.recompute",
  queue: "inventory-stock-transfers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
