export const currenciesReminderJob = {
  name: "finance/currencies.reminder",
  queue: "finance-currencies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
