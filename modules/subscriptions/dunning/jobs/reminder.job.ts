export const dunningReminderJob = {
  name: "subscriptions/dunning.reminder",
  queue: "subscriptions-dunning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
