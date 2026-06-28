export const stockTransfersSyncJob = {
  name: "inventory/stock-transfers.sync",
  queue: "inventory-stock-transfers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
