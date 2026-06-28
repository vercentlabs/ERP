export const checkoutInboundAdapter = {
  name: "commerce/checkout.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/checkout",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
