export const chartOfAccountsReminderJob = {
  name: "finance/chart-of-accounts.reminder",
  queue: "finance-chart-of-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
