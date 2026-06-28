export const wavesRecomputeJob = {
  name: "warehouse/waves.recompute",
  queue: "warehouse-waves",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
