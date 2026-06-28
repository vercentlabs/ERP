export const safetyStockSyncJob = {
  name: "inventory/safety-stock.sync",
  queue: "inventory-safety-stock",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
