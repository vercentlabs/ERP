export const dataQualityRecomputeJob = {
  name: "master-data/data-quality.recompute",
  queue: "master-data-data-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
