export const deduplicationReminderJob = {
  name: "master-data/deduplication.reminder",
  queue: "master-data-deduplication",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
