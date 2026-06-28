export const scenarioModelingRecomputeJob = {
  name: "enterprise-performance/scenario-modeling.recompute",
  queue: "enterprise-performance-scenario-modeling",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
