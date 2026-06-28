export const foodAndBeverageWebhookAdapter = {
  name: "industry-packs/food-and-beverage.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/food-and-beverage",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
