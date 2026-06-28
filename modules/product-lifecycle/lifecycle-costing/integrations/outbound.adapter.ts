export const lifecycleCostingOutboundAdapter = {
  name: "product-lifecycle/lifecycle-costing.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/lifecycle-costing",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
