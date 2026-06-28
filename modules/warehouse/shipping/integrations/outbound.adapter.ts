export const shippingOutboundAdapter = {
  name: "warehouse/shipping.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/shipping",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
