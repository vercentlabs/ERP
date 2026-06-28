export const routesRecomputeJob = {
  name: "logistics/routes.recompute",
  queue: "logistics-routes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
