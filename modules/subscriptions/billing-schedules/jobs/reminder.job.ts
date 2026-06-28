export const billingSchedulesReminderJob = {
  name: "subscriptions/billing-schedules.reminder",
  queue: "subscriptions-billing-schedules",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
