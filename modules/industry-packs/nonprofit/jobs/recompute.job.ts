export const nonprofitRecomputeJob = {
  name: "industry-packs/nonprofit.recompute",
  queue: "industry-packs-nonprofit",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
