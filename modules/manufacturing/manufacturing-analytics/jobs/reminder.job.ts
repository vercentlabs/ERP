export const manufacturingAnalyticsReminderJob = {
  name: "manufacturing/manufacturing-analytics.reminder",
  queue: "manufacturing-manufacturing-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
