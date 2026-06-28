export const publicApiRecomputeJob = {
  name: "integration-marketplace/public-api.recompute",
  queue: "integration-marketplace-public-api",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
