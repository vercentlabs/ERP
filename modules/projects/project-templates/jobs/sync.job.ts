export const projectTemplatesSyncJob = {
  name: "projects/project-templates.sync",
  queue: "projects-project-templates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
