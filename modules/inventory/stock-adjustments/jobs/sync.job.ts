export const stockAdjustmentsSyncJob = {
  name: "inventory/stock-adjustments.sync",
  queue: "inventory-stock-adjustments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
