export const productsReminderJob = {
  name: "product-lifecycle/products.reminder",
  queue: "product-lifecycle-products",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
