export const notificationsSyncJob = {
  name: "platform/notifications.sync",
  queue: "platform-notifications",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
