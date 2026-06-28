export const lifecycleCostingRecomputeJob = {
  name: "product-lifecycle/lifecycle-costing.recompute",
  queue: "product-lifecycle-lifecycle-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
