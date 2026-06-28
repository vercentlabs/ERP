export const cdcRecomputeJob = {
  name: "data-platform/cdc.recompute",
  queue: "data-platform-cdc",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
