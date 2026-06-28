export const sdkManagementSyncJob = {
  name: "integration-marketplace/sdk-management.sync",
  queue: "integration-marketplace-sdk-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
