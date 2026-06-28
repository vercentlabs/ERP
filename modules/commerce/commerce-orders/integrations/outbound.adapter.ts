export const commerceOrdersOutboundAdapter = {
  name: "commerce/commerce-orders.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/commerce-orders",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
