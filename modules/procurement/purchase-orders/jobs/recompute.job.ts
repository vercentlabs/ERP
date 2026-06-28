export const purchaseOrdersRecomputeJob = {
  name: "procurement/purchase-orders.recompute",
  queue: "procurement-purchase-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
