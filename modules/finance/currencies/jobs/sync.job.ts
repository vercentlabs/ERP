export const currenciesSyncJob = {
  name: "finance/currencies.sync",
  queue: "finance-currencies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
