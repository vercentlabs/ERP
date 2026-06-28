export const lifecycleCostingInboundAdapter = {
  name: "product-lifecycle/lifecycle-costing.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/lifecycle-costing",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
