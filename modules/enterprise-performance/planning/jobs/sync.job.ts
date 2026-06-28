export const planningSyncJob = {
  name: "enterprise-performance/planning.sync",
  queue: "enterprise-performance-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
