export const foodAndBeverageInboundAdapter = {
  name: "industry-packs/food-and-beverage.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/food-and-beverage",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
