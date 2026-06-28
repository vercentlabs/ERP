export const demandForecastingRecomputeJob = {
  name: "ai/demand-forecasting.recompute",
  queue: "ai-demand-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
