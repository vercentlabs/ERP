export const mitigationsRecomputeJob = {
  name: "risk-management/mitigations.recompute",
  queue: "risk-management-mitigations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
