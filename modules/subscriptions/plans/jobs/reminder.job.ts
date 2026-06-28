export const plansReminderJob = {
  name: "subscriptions/plans.reminder",
  queue: "subscriptions-plans",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
