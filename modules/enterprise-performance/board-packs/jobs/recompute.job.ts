export const boardPacksRecomputeJob = {
  name: "enterprise-performance/board-packs.recompute",
  queue: "enterprise-performance-board-packs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
