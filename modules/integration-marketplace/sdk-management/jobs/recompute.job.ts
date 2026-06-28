export const sdkManagementRecomputeJob = {
  name: "integration-marketplace/sdk-management.recompute",
  queue: "integration-marketplace-sdk-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
