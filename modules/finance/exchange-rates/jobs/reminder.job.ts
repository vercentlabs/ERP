export const exchangeRatesReminderJob = {
  name: "finance/exchange-rates.reminder",
  queue: "finance-exchange-rates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
