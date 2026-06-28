export const budgetingSyncJob = {
  name: "enterprise-performance/budgeting.sync",
  queue: "enterprise-performance-budgeting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
