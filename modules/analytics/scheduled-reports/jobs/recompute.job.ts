export const scheduledReportsRecomputeJob = {
  name: "analytics/scheduled-reports.recompute",
  queue: "analytics-scheduled-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
