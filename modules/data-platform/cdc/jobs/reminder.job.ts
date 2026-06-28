export const cdcReminderJob = {
  name: "data-platform/cdc.reminder",
  queue: "data-platform-cdc",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
