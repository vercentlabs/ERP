export const lifecycleCostingSyncJob = {
  name: "product-lifecycle/lifecycle-costing.sync",
  queue: "product-lifecycle-lifecycle-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
