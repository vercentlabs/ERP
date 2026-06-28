export const projectCostingRecomputeJob = {
  name: "projects/project-costing.recompute",
  queue: "projects-project-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
