export const projectsReminderJob = {
  name: "projects/projects.reminder",
  queue: "projects-projects",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
