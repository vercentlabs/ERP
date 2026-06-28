export const aiInsightsReminderJob = {
  name: "analytics/ai-insights.reminder",
  queue: "analytics-ai-insights",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
