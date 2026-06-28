export const profitabilityRecomputeJob = {
  name: "projects/profitability.recompute",
  queue: "projects-profitability",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
