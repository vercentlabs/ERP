export const controlsRecomputeJob = {
  name: "compliance/controls.recompute",
  queue: "compliance-controls",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
