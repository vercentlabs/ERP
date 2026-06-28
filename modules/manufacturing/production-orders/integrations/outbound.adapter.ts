export const productionOrdersOutboundAdapter = {
  name: "manufacturing/production-orders.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/production-orders",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
