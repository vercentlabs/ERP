export const reportBuilderRecomputeJob = {
  name: "analytics/report-builder.recompute",
  queue: "analytics-report-builder",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
