export const boardPacksSyncJob = {
  name: "enterprise-performance/board-packs.sync",
  queue: "enterprise-performance-board-packs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
