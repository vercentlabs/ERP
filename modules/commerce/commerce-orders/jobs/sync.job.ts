export const commerceOrdersSyncJob = {
  name: "commerce/commerce-orders.sync",
  queue: "commerce-commerce-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
