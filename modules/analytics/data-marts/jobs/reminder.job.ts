export const dataMartsReminderJob = {
  name: "analytics/data-marts.reminder",
  queue: "analytics-data-marts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
