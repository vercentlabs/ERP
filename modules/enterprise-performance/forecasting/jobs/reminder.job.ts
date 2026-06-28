export const forecastingReminderJob = {
  name: "enterprise-performance/forecasting.reminder",
  queue: "enterprise-performance-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
