export const notificationsRecomputeJob = {
  name: "platform/notifications.recompute",
  queue: "platform-notifications",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
