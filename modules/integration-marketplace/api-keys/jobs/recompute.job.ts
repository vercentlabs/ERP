export const apiKeysRecomputeJob = {
  name: "integration-marketplace/api-keys.recompute",
  queue: "integration-marketplace-api-keys",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
