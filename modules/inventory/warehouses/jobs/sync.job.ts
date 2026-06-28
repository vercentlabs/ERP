export const warehousesSyncJob = {
  name: "inventory/warehouses.sync",
  queue: "inventory-warehouses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
