export const checkoutReminderJob = {
  name: "commerce/checkout.reminder",
  queue: "commerce-checkout",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
