export const engineeringChangeOrdersSyncJob = {
  name: "product-lifecycle/engineering-change-orders.sync",
  queue: "product-lifecycle-engineering-change-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
