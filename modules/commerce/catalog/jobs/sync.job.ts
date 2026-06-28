export const catalogSyncJob = {
  name: "commerce/catalog.sync",
  queue: "commerce-catalog",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
