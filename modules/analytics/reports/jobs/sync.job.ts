export const reportsSyncJob = {
  name: "analytics/reports.sync",
  queue: "analytics-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
