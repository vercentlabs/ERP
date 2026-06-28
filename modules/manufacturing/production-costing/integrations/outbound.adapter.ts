export const productionCostingOutboundAdapter = {
  name: "manufacturing/production-costing.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/production-costing",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
