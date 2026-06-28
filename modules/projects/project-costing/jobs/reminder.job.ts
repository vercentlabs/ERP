export const projectCostingReminderJob = {
  name: "projects/project-costing.reminder",
  queue: "projects-project-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
