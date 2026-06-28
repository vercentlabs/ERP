export const reportBuilderReminderJob = {
  name: "analytics/report-builder.reminder",
  queue: "analytics-report-builder",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
