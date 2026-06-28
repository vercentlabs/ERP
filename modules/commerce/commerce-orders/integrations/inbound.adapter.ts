export const commerceOrdersInboundAdapter = {
  name: "commerce/commerce-orders.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/commerce-orders",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
