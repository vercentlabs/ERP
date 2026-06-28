export const projectTemplatesReminderJob = {
  name: "projects/project-templates.reminder",
  queue: "projects-project-templates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
