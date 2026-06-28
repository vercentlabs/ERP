export const scheduledReportsReminderJob = {
  name: "analytics/scheduled-reports.reminder",
  queue: "analytics-scheduled-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
