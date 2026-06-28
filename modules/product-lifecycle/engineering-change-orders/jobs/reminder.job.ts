export const engineeringChangeOrdersReminderJob = {
  name: "product-lifecycle/engineering-change-orders.reminder",
  queue: "product-lifecycle-engineering-change-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
