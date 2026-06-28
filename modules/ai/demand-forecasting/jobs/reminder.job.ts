export const demandForecastingReminderJob = {
  name: "ai/demand-forecasting.reminder",
  queue: "ai-demand-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
