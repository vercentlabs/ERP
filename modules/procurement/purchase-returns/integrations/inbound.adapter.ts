export const purchaseReturnsInboundAdapter = {
  name: "procurement/purchase-returns.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-returns",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
