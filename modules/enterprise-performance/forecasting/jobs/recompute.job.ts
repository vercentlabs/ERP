export const forecastingRecomputeJob = {
  name: "enterprise-performance/forecasting.recompute",
  queue: "enterprise-performance-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
