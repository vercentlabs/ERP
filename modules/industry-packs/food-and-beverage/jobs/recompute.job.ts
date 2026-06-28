export const foodAndBeverageRecomputeJob = {
  name: "industry-packs/food-and-beverage.recompute",
  queue: "industry-packs-food-and-beverage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
