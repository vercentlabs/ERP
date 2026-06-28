export const reportsReminderJob = {
  name: "analytics/reports.reminder",
  queue: "analytics-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
