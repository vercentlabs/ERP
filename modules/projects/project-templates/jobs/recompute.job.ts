export const projectTemplatesRecomputeJob = {
  name: "projects/project-templates.recompute",
  queue: "projects-project-templates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
