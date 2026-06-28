export const planningInboundAdapter = {
  name: "enterprise-performance/planning.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/planning",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
