export const manufacturingAnalyticsRecomputeJob = {
  name: "manufacturing/manufacturing-analytics.recompute",
  queue: "manufacturing-manufacturing-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
