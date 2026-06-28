export const landedCostsRecomputeJob = {
  name: "procurement/landed-costs.recompute",
  queue: "procurement-landed-costs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
