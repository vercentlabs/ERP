export const valuationInboundAdapter = {
  name: "inventory/valuation.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/valuation",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
