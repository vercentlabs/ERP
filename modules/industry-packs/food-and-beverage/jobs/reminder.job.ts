export const foodAndBeverageReminderJob = {
  name: "industry-packs/food-and-beverage.reminder",
  queue: "industry-packs-food-and-beverage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
