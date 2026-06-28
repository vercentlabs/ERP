export const expensesRecomputeJob = {
  name: "hr/expenses.recompute",
  queue: "hr-expenses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
