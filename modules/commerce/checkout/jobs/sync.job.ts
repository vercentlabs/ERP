export const checkoutSyncJob = {
  name: "commerce/checkout.sync",
  queue: "commerce-checkout",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
