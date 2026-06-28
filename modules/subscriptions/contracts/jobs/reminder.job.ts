export const contractsReminderJob = {
  name: "subscriptions/contracts.reminder",
  queue: "subscriptions-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
