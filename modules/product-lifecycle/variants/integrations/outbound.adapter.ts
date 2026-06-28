export const variantsOutboundAdapter = {
  name: "product-lifecycle/variants.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/variants",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
