export const itemsRecomputeJob = {
  name: "inventory/items.recompute",
  queue: "inventory-items",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
