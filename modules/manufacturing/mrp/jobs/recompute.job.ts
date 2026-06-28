export const mrpRecomputeJob = {
  name: "manufacturing/mrp.recompute",
  queue: "manufacturing-mrp",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
