export const consolidationRecomputeJob = {
  name: "finance/consolidation.recompute",
  queue: "finance-consolidation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
