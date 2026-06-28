export const budgetsSyncJob = {
  name: "finance/budgets.sync",
  queue: "finance-budgets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
