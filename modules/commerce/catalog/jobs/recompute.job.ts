export const catalogRecomputeJob = {
  name: "commerce/catalog.recompute",
  queue: "commerce-catalog",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
