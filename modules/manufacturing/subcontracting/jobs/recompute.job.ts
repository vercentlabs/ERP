export const subcontractingRecomputeJob = {
  name: "manufacturing/subcontracting.recompute",
  queue: "manufacturing-subcontracting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
