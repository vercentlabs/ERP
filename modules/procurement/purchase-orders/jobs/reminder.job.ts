export const purchaseOrdersReminderJob = {
  name: "procurement/purchase-orders.reminder",
  queue: "procurement-purchase-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
