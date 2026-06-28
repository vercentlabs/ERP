export const usersSyncJob = {
  name: "platform/users.sync",
  queue: "platform-users",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
