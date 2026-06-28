export const exportsSyncJob = {
  name: "platform/exports.sync",
  queue: "platform-exports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
