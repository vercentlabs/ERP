export const transportCostingInboundAdapter = {
  name: "logistics/transport-costing.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/transport-costing",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
