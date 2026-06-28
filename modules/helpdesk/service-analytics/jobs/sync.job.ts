export const serviceAnalyticsSyncJob = {
  name: "helpdesk/service-analytics.sync",
  queue: "helpdesk-service-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
