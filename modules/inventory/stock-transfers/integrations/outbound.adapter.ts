export const stockTransfersOutboundAdapter = {
  name: "inventory/stock-transfers.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-transfers",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
