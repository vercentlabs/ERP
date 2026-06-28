export const itemCategoriesReminderJob = {
  name: "inventory/item-categories.reminder",
  queue: "inventory-item-categories",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
