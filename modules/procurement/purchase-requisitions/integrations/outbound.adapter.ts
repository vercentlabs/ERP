export const purchaseRequisitionsOutboundAdapter = {
  name: "procurement/purchase-requisitions.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-requisitions",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
