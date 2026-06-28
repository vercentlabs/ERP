export const engineeringChangeOrdersInboundAdapter = {
  name: "product-lifecycle/engineering-change-orders.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/engineering-change-orders",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
