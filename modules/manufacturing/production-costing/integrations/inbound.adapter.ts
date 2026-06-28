export const productionCostingInboundAdapter = {
  name: "manufacturing/production-costing.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/production-costing",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
