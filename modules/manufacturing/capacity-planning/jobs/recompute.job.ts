export const capacityPlanningRecomputeJob = {
  name: "manufacturing/capacity-planning.recompute",
  queue: "manufacturing-capacity-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
