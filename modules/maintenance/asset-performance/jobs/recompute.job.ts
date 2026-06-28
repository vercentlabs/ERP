export const assetPerformanceRecomputeJob = {
  name: "maintenance/asset-performance.recompute",
  queue: "maintenance-asset-performance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
