export const shipmentsSyncJob = {
  name: "logistics/shipments.sync",
  queue: "logistics-shipments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
