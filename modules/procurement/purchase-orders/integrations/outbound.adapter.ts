export const purchaseOrdersOutboundAdapter = {
  name: "procurement/purchase-orders.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-orders",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
