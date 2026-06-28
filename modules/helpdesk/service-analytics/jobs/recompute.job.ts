export const serviceAnalyticsRecomputeJob = {
  name: "helpdesk/service-analytics.recompute",
  queue: "helpdesk-service-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
