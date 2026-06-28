export const salesOrdersReminderJob = {
  name: "sales/sales-orders.reminder",
  queue: "sales-sales-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
