export const resourcePlanningReminderJob = {
  name: "projects/resource-planning.reminder",
  queue: "projects-resource-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
