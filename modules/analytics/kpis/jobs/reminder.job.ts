export const kpisReminderJob = {
  name: "analytics/kpis.reminder",
  queue: "analytics-kpis",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
