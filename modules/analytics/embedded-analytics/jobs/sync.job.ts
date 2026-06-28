export const embeddedAnalyticsSyncJob = {
  name: "analytics/embedded-analytics.sync",
  queue: "analytics-embedded-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
