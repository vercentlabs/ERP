export const dashboardsRecomputeJob = {
  name: "analytics/dashboards.recompute",
  queue: "analytics-dashboards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
