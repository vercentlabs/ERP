export const checkoutOutboundAdapter = {
  name: "commerce/checkout.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/checkout",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
