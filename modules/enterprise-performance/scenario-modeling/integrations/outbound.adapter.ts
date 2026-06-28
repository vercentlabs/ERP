export const scenarioModelingOutboundAdapter = {
  name: "enterprise-performance/scenario-modeling.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/scenario-modeling",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
