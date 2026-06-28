export const exchangeRatesSyncJob = {
  name: "finance/exchange-rates.sync",
  queue: "finance-exchange-rates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
