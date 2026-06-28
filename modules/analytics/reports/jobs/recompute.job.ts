export const reportsRecomputeJob = {
  name: "analytics/reports.recompute",
  queue: "analytics-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
