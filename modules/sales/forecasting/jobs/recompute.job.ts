export const forecastingRecomputeJob = {
  name: "sales/forecasting.recompute",
  queue: "sales-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
