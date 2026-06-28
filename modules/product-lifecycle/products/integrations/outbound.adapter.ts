export const productsOutboundAdapter = {
  name: "product-lifecycle/products.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/products",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
