export const routingsRecomputeJob = {
  name: "manufacturing/routings.recompute",
  queue: "manufacturing-routings",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
