export const itemsReminderJob = {
  name: "inventory/items.reminder",
  queue: "inventory-items",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
