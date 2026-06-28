export const paymentsReminderJob = {
  name: "finance/payments.reminder",
  queue: "finance-payments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
