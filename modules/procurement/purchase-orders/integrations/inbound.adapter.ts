export const purchaseOrdersInboundAdapter = {
  name: "procurement/purchase-orders.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-orders",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
