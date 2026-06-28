export const productsInboundAdapter = {
  name: "product-lifecycle/products.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/products",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
