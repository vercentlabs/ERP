export const blanketOrdersOutboundAdapter = {
  name: "procurement/blanket-orders.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/blanket-orders",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
