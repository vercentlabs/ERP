export const searchSyncJob = {
  name: "platform/search.sync",
  queue: "platform-search",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
