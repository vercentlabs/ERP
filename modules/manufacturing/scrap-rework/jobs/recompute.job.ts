export const scrapReworkRecomputeJob = {
  name: "manufacturing/scrap-rework.recompute",
  queue: "manufacturing-scrap-rework",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
