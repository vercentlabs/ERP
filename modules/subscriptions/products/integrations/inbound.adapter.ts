export const productsInboundAdapter = {
  name: "subscriptions/products.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/products",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
