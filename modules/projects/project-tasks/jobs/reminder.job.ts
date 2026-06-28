export const projectTasksReminderJob = {
  name: "projects/project-tasks.reminder",
  queue: "projects-project-tasks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
