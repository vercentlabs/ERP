export const embeddedAnalyticsReminderJob = {
  name: "analytics/embedded-analytics.reminder",
  queue: "analytics-embedded-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
