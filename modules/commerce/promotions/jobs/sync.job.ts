export const promotionsSyncJob = {
  name: "commerce/promotions.sync",
  queue: "commerce-promotions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
