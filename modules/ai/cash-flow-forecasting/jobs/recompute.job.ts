export const cashFlowForecastingRecomputeJob = {
  name: "ai/cash-flow-forecasting.recompute",
  queue: "ai-cash-flow-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
