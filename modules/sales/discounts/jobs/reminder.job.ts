export const discountsReminderJob = {
  name: "sales/discounts.reminder",
  queue: "sales-discounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
