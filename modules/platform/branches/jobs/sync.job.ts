export const branchesSyncJob = {
  name: "platform/branches.sync",
  queue: "platform-branches",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
