export const certificationsRecomputeJob = {
  name: "compliance/certifications.recompute",
  queue: "compliance-certifications",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
