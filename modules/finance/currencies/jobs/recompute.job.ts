export const currenciesRecomputeJob = {
  name: "finance/currencies.recompute",
  queue: "finance-currencies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
