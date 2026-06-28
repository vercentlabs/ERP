export const engineeringChangeOrdersRecomputeJob = {
  name: "product-lifecycle/engineering-change-orders.recompute",
  queue: "product-lifecycle-engineering-change-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
