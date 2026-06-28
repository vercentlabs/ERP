export const dataRetentionReminderJob = {
  name: "compliance/data-retention.reminder",
  queue: "compliance-data-retention",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
