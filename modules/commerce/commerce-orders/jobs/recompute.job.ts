export const commerceOrdersRecomputeJob = {
  name: "commerce/commerce-orders.recompute",
  queue: "commerce-commerce-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
