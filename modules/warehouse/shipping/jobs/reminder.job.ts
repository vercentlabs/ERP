export const shippingReminderJob = {
  name: "warehouse/shipping.reminder",
  queue: "warehouse-shipping",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
