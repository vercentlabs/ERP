export const projectsSyncJob = {
  name: "projects/projects.sync",
  queue: "projects-projects",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
