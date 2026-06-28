export const shippingInboundAdapter = {
  name: "warehouse/shipping.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/shipping",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
