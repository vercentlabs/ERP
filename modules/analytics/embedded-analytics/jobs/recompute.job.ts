export const embeddedAnalyticsRecomputeJob = {
  name: "analytics/embedded-analytics.recompute",
  queue: "analytics-embedded-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
