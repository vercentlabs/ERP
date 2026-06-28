export const namingSeriesRecomputeJob = {
  name: "platform/naming-series.recompute",
  queue: "platform-naming-series",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
