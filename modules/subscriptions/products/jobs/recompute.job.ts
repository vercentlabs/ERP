export const productsRecomputeJob = {
  name: "subscriptions/products.recompute",
  queue: "subscriptions-products",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
