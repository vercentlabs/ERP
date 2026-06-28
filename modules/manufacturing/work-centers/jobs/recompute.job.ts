export const workCentersRecomputeJob = {
  name: "manufacturing/work-centers.recompute",
  queue: "manufacturing-work-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
