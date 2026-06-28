export const dataMartsSyncJob = {
  name: "analytics/data-marts.sync",
  queue: "analytics-data-marts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
