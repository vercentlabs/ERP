export const stockAdjustmentsOutboundAdapter = {
  name: "inventory/stock-adjustments.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-adjustments",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
