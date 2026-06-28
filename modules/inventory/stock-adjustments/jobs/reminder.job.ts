export const stockAdjustmentsReminderJob = {
  name: "inventory/stock-adjustments.reminder",
  queue: "inventory-stock-adjustments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
