export const dataMartsRecomputeJob = {
  name: "analytics/data-marts.recompute",
  queue: "analytics-data-marts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
