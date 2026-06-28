export const manufacturingAnalyticsSyncJob = {
  name: "manufacturing/manufacturing-analytics.sync",
  queue: "manufacturing-manufacturing-analytics",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
