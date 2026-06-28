export const channelSyncSyncJob = {
  name: "commerce/channel-sync.sync",
  queue: "commerce-channel-sync",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
