export const dashboardsSyncJob = {
  name: "analytics/dashboards.sync",
  queue: "analytics-dashboards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
