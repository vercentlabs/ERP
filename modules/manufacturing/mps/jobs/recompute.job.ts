export const mpsRecomputeJob = {
  name: "manufacturing/mps.recompute",
  queue: "manufacturing-mps",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
