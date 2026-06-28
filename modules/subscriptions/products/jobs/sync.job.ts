export const productsSyncJob = {
  name: "subscriptions/products.sync",
  queue: "subscriptions-products",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
