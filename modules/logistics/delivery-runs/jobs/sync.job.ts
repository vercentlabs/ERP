export const deliveryRunsSyncJob = {
  name: "logistics/delivery-runs.sync",
  queue: "logistics-delivery-runs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
