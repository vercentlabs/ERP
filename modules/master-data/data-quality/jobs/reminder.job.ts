export const dataQualityReminderJob = {
  name: "master-data/data-quality.reminder",
  queue: "master-data-data-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
