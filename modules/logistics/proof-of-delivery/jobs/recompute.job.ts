export const proofOfDeliveryRecomputeJob = {
  name: "logistics/proof-of-delivery.recompute",
  queue: "logistics-proof-of-delivery",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
