export const chartOfAccountsRecomputeJob = {
  name: "finance/chart-of-accounts.recompute",
  queue: "finance-chart-of-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
