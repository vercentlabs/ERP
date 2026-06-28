export const meteredUsageReminderJob = {
  name: "subscriptions/metered-usage.reminder",
  queue: "subscriptions-metered-usage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
