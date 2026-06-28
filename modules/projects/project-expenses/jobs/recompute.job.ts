export const projectExpensesRecomputeJob = {
  name: "projects/project-expenses.recompute",
  queue: "projects-project-expenses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
