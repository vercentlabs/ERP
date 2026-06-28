export const cartsReminderJob = {
  name: "commerce/carts.reminder",
  queue: "commerce-carts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
