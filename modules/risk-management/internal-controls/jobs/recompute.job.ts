export const internalControlsRecomputeJob = {
  name: "risk-management/internal-controls.recompute",
  queue: "risk-management-internal-controls",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
