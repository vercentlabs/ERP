export const planningRecomputeJob = {
  name: "enterprise-performance/planning.recompute",
  queue: "enterprise-performance-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
