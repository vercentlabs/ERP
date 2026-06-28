export const productsRecomputeJob = {
  name: "product-lifecycle/products.recompute",
  queue: "product-lifecycle-products",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
