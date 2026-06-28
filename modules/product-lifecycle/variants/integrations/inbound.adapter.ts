export const variantsInboundAdapter = {
  name: "product-lifecycle/variants.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/variants",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
