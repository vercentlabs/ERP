export const commerceOrdersReminderJob = {
  name: "commerce/commerce-orders.reminder",
  queue: "commerce-commerce-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
