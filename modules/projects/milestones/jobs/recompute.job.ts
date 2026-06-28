export const milestonesRecomputeJob = {
  name: "projects/milestones.recompute",
  queue: "projects-milestones",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
