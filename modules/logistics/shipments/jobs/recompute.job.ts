export const shipmentsRecomputeJob = {
  name: "logistics/shipments.recompute",
  queue: "logistics-shipments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
