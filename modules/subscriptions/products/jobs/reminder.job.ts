export const productsReminderJob = {
  name: "subscriptions/products.reminder",
  queue: "subscriptions-products",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
