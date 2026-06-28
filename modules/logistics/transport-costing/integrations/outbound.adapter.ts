export const transportCostingOutboundAdapter = {
  name: "logistics/transport-costing.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/transport-costing",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
