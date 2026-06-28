export const dashboardsReminderJob = {
  name: "analytics/dashboards.reminder",
  queue: "analytics-dashboards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
