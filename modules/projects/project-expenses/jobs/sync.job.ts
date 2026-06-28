export const projectExpensesSyncJob = {
  name: "projects/project-expenses.sync",
  queue: "projects-project-expenses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
