export const constructionRecomputeJob = {
  name: "industry-packs/construction.recompute",
  queue: "industry-packs-construction",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
