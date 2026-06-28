export const commentsSyncJob = {
  name: "platform/comments.sync",
  queue: "platform-comments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
