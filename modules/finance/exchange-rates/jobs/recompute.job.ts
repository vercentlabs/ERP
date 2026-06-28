export const exchangeRatesRecomputeJob = {
  name: "finance/exchange-rates.recompute",
  queue: "finance-exchange-rates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
