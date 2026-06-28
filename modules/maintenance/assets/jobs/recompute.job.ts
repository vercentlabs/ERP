export const assetsRecomputeJob = {
  name: "maintenance/assets.recompute",
  queue: "maintenance-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
