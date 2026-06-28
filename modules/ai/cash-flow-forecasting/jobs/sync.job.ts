export const cashFlowForecastingSyncJob = {
  name: "ai/cash-flow-forecasting.sync",
  queue: "ai-cash-flow-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
