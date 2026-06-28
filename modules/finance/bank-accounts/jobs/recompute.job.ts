export const bankAccountsRecomputeJob = {
  name: "finance/bank-accounts.recompute",
  queue: "finance-bank-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
