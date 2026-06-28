export const forecastingSyncJob = {
  name: "enterprise-performance/forecasting.sync",
  queue: "enterprise-performance-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
