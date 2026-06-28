export const apparelRecomputeJob = {
  name: "industry-packs/apparel.recompute",
  queue: "industry-packs-apparel",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
