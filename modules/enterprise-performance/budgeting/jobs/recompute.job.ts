export const budgetingRecomputeJob = {
  name: "enterprise-performance/budgeting.recompute",
  queue: "enterprise-performance-budgeting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
