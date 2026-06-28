export const searchReminderJob = {
  name: "platform/search.reminder",
  queue: "platform-search",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
