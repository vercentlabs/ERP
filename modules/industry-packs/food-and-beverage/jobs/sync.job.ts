export const foodAndBeverageSyncJob = {
  name: "industry-packs/food-and-beverage.sync",
  queue: "industry-packs-food-and-beverage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
