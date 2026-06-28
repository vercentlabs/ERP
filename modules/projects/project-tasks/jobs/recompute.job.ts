export const projectTasksRecomputeJob = {
  name: "projects/project-tasks.recompute",
  queue: "projects-project-tasks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
