export const developerPortalRecomputeJob = {
  name: "integration-marketplace/developer-portal.recompute",
  queue: "integration-marketplace-developer-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
