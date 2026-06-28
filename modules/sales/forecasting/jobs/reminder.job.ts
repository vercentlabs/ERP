export const forecastingReminderJob = {
  name: "sales/forecasting.reminder",
  queue: "sales-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
