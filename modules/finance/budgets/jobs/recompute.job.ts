export const budgetsRecomputeJob = {
  name: "finance/budgets.recompute",
  queue: "finance-budgets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
