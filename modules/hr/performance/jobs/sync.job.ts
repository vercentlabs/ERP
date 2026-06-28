export const performanceSyncJob = {
  name: "hr/performance.sync",
  queue: "hr-performance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
