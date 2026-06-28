export const developerPortalSyncJob = {
  name: "integration-marketplace/developer-portal.sync",
  queue: "integration-marketplace-developer-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
