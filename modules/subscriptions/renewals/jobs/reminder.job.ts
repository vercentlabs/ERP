export const renewalsReminderJob = {
  name: "subscriptions/renewals.reminder",
  queue: "subscriptions-renewals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
