export const itemsRecomputeJob = {
  name: "master-data/items.recompute",
  queue: "master-data-items",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
