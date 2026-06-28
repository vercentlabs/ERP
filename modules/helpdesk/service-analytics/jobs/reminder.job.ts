export const serviceAnalyticsReminderJob = {
  name: "helpdesk/service-analytics.reminder",
  queue: "helpdesk-service-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
