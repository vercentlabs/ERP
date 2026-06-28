export const varianceAnalysisSyncJob = {
  name: "enterprise-performance/variance-analysis.sync",
  queue: "enterprise-performance-variance-analysis",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
