export const segregationOfDutiesRecomputeJob = {
  name: "compliance/segregation-of-duties.recompute",
  queue: "compliance-segregation-of-duties",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
