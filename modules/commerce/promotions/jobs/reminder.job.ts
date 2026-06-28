export const promotionsReminderJob = {
  name: "commerce/promotions.reminder",
  queue: "commerce-promotions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
