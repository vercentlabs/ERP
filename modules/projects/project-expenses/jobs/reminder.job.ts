export const projectExpensesReminderJob = {
  name: "projects/project-expenses.reminder",
  queue: "projects-project-expenses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
