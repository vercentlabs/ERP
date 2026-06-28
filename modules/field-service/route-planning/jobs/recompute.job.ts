export const routePlanningRecomputeJob = {
  name: "field-service/route-planning.recompute",
  queue: "field-service-route-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
