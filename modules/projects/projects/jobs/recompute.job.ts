export const projectsRecomputeJob = {
  name: "projects/projects.recompute",
  queue: "projects-projects",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
