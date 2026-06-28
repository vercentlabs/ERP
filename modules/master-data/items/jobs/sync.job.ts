export const itemsSyncJob = {
  name: "master-data/items.sync",
  queue: "master-data-items",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
