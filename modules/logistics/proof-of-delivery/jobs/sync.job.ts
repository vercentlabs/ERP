export const proofOfDeliverySyncJob = {
  name: "logistics/proof-of-delivery.sync",
  queue: "logistics-proof-of-delivery",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
