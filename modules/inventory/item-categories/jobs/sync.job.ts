export const itemCategoriesSyncJob = {
  name: "inventory/item-categories.sync",
  queue: "inventory-item-categories",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
