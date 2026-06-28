export const namingSeriesReminderJob = {
  name: "platform/naming-series.reminder",
  queue: "platform-naming-series",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
