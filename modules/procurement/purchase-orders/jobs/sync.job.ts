export const purchaseOrdersSyncJob = {
  name: "procurement/purchase-orders.sync",
  queue: "procurement-purchase-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
