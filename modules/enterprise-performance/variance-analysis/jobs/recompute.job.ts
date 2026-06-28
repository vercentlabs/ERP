export const varianceAnalysisRecomputeJob = {
  name: "enterprise-performance/variance-analysis.recompute",
  queue: "enterprise-performance-variance-analysis",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
