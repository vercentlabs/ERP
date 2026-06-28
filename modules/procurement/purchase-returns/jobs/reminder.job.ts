export const purchaseReturnsReminderJob = {
  name: "procurement/purchase-returns.reminder",
  queue: "procurement-purchase-returns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
