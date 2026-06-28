export const reportBuilderSyncJob = {
  name: "analytics/report-builder.sync",
  queue: "analytics-report-builder",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
