export const productsSyncJob = {
  name: "product-lifecycle/products.sync",
  queue: "product-lifecycle-products",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
