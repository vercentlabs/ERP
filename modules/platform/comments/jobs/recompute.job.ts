export const commentsRecomputeJob = {
  name: "platform/comments.recompute",
  queue: "platform-comments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
