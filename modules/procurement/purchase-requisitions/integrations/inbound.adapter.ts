export const purchaseRequisitionsInboundAdapter = {
  name: "procurement/purchase-requisitions.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-requisitions",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
