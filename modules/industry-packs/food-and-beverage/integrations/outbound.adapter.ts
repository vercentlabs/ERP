export const foodAndBeverageOutboundAdapter = {
  name: "industry-packs/food-and-beverage.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/food-and-beverage",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
