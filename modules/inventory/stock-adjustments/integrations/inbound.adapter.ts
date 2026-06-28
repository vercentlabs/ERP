export const stockAdjustmentsInboundAdapter = {
  name: "inventory/stock-adjustments.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-adjustments",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
