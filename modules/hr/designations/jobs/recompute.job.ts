export const designationsRecomputeJob = {
  name: "hr/designations.recompute",
  queue: "hr-designations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
