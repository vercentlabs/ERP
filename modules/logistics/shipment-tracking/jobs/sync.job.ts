export const shipmentTrackingSyncJob = {
  name: "logistics/shipment-tracking.sync",
  queue: "logistics-shipment-tracking",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
