export const projectTasksSyncJob = {
  name: "projects/project-tasks.sync",
  queue: "projects-project-tasks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
