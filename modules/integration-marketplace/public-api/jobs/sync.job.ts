export const publicApiSyncJob = {
  name: "integration-marketplace/public-api.sync",
  queue: "integration-marketplace-public-api",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
