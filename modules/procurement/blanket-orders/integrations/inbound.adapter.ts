export const blanketOrdersInboundAdapter = {
  name: "procurement/blanket-orders.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/blanket-orders",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
