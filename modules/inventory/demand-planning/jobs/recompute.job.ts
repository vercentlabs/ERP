export const demandPlanningRecomputeJob = {
  name: "inventory/demand-planning.recompute",
  queue: "inventory-demand-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
