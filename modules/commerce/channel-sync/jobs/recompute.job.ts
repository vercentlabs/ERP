export const channelSyncRecomputeJob = {
  name: "commerce/channel-sync.recompute",
  queue: "commerce-channel-sync",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
