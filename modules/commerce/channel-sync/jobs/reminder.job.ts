export const channelSyncReminderJob = {
  name: "commerce/channel-sync.reminder",
  queue: "commerce-channel-sync",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
