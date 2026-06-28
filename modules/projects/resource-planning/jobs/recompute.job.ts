export const resourcePlanningRecomputeJob = {
  name: "projects/resource-planning.recompute",
  queue: "projects-resource-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
