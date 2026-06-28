export const shipmentsOutboundAdapter = {
  name: "logistics/shipments.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/shipments",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
