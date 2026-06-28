export const shipmentTrackingRecomputeJob = {
  name: "logistics/shipment-tracking.recompute",
  queue: "logistics-shipment-tracking",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
