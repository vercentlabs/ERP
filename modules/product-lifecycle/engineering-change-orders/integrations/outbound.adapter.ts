export const engineeringChangeOrdersOutboundAdapter = {
  name: "product-lifecycle/engineering-change-orders.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/engineering-change-orders",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
