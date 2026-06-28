export const purchaseReturnsOutboundAdapter = {
  name: "procurement/purchase-returns.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-returns",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
