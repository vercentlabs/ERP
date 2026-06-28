export const assetPerformanceSyncJob = {
  name: "maintenance/asset-performance.sync",
  queue: "maintenance-asset-performance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
