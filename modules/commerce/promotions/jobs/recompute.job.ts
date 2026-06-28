export const promotionsRecomputeJob = {
  name: "commerce/promotions.recompute",
  queue: "commerce-promotions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
