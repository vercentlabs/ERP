export const searchRecomputeJob = {
  name: "platform/search.recompute",
  queue: "platform-search",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
