export const expensesSyncJob = {
  name: "hr/expenses.sync",
  queue: "hr-expenses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
