export const assetsSyncJob = {
  name: "maintenance/assets.sync",
  queue: "maintenance-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
