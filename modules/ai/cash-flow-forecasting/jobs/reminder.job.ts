export const cashFlowForecastingReminderJob = {
  name: "ai/cash-flow-forecasting.reminder",
  queue: "ai-cash-flow-forecasting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
