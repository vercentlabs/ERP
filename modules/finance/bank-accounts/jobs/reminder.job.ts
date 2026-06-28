export const bankAccountsReminderJob = {
  name: "finance/bank-accounts.reminder",
  queue: "finance-bank-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
