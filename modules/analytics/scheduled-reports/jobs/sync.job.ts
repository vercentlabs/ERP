export const scheduledReportsSyncJob = {
  name: "analytics/scheduled-reports.sync",
  queue: "analytics-scheduled-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
