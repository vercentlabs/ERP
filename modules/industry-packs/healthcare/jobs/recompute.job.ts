export const healthcareRecomputeJob = {
  name: "industry-packs/healthcare.recompute",
  queue: "industry-packs-healthcare",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
