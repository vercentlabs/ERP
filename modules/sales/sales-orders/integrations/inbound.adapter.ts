export const salesOrdersInboundAdapter = {
  name: "sales/sales-orders.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/sales-orders",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
