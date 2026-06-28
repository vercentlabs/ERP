export const deliveryRunsOutboundAdapter = {
  name: "logistics/delivery-runs.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/delivery-runs",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
