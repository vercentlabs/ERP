export const discountsSyncJob = {
  name: "sales/discounts.sync",
  queue: "sales-discounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
