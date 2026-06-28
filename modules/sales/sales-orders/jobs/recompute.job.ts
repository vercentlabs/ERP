export const salesOrdersRecomputeJob = {
  name: "sales/sales-orders.recompute",
  queue: "sales-sales-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
