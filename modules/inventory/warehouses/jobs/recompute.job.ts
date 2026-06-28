export const warehousesRecomputeJob = {
  name: "inventory/warehouses.recompute",
  queue: "inventory-warehouses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
