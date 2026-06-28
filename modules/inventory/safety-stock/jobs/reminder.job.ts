export const safetyStockReminderJob = {
  name: "inventory/safety-stock.reminder",
  queue: "inventory-safety-stock",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
