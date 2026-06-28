export const productsOutboundAdapter = {
  name: "subscriptions/products.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/products",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
