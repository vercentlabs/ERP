export const deliveryRunsRecomputeJob = {
  name: "logistics/delivery-runs.recompute",
  queue: "logistics-delivery-runs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
