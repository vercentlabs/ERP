export const inspectionPlansRecomputeJob = {
  name: "quality/inspection-plans.recompute",
  queue: "quality-inspection-plans",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
