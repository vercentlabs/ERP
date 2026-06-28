export const kpisSyncJob = {
  name: "analytics/kpis.sync",
  queue: "analytics-kpis",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
