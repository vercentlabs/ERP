export const itemsSyncJob = {
  name: "inventory/items.sync",
  queue: "inventory-items",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
