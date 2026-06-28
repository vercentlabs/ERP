export const deferredRevenueReminderJob = {
  name: "finance/deferred-revenue.reminder",
  queue: "finance-deferred-revenue",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
