export const fixedAssetsRecomputeJob = {
  name: "finance/fixed-assets.recompute",
  queue: "finance-fixed-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
