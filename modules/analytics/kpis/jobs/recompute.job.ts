export const kpisRecomputeJob = {
  name: "analytics/kpis.recompute",
  queue: "analytics-kpis",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
