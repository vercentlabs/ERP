export const scenarioModelingInboundAdapter = {
  name: "enterprise-performance/scenario-modeling.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/scenario-modeling",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
