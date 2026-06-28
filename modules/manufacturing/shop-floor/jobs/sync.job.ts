export const shopFloorSyncJob = {
  name: "manufacturing/shop-floor.sync",
  queue: "manufacturing-shop-floor",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
