export const stockTransfersReminderJob = {
  name: "inventory/stock-transfers.reminder",
  queue: "inventory-stock-transfers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
