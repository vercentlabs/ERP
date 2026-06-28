export const wholesaleDistributionRecomputeJob = {
  name: "industry-packs/wholesale-distribution.recompute",
  queue: "industry-packs-wholesale-distribution",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
