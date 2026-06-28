export const couponsReminderJob = {
  name: "commerce/coupons.reminder",
  queue: "commerce-coupons",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
