export const scenarioModelingSyncJob = {
  name: "enterprise-performance/scenario-modeling.sync",
  queue: "enterprise-performance-scenario-modeling",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
