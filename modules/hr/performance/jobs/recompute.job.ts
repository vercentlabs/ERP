export const performanceRecomputeJob = {
  name: "hr/performance.recompute",
  queue: "hr-performance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
