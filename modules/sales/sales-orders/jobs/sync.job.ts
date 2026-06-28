export const salesOrdersSyncJob = {
  name: "sales/sales-orders.sync",
  queue: "sales-sales-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
