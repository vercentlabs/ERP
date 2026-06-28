export const itemCategoriesRecomputeJob = {
  name: "inventory/item-categories.recompute",
  queue: "inventory-item-categories",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
