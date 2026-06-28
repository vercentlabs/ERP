export const apiKeysSyncJob = {
  name: "integration-marketplace/api-keys.sync",
  queue: "integration-marketplace-api-keys",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
