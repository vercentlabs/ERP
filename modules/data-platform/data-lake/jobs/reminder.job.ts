export const dataLakeReminderJob = {
  name: "data-platform/data-lake.reminder",
  queue: "data-platform-data-lake",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
