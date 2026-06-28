export const catalogReminderJob = {
  name: "commerce/catalog.reminder",
  queue: "commerce-catalog",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
