export const shippingSyncJob = {
  name: "warehouse/shipping.sync",
  queue: "warehouse-shipping",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
