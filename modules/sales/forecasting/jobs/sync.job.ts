export const forecastingSyncJob = {
  name: "sales/forecasting.sync",
  queue: "sales-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
