export const couponsSyncJob = {
  name: "commerce/coupons.sync",
  queue: "commerce-coupons",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
