export const authSyncJob = {
  name: "platform/auth.sync",
  queue: "platform-auth",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
