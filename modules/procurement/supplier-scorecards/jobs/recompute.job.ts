export const supplierScorecardsRecomputeJob = {
  name: "procurement/supplier-scorecards.recompute",
  queue: "procurement-supplier-scorecards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
