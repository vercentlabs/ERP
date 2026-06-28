export const demandForecastingSyncJob = {
  name: "ai/demand-forecasting.sync",
  queue: "ai-demand-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
