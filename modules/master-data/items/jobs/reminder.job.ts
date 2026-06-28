export const itemsReminderJob = {
  name: "master-data/items.reminder",
  queue: "master-data-items",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
