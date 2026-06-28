export const performanceInboundAdapter = {
  name: "hr/performance.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/performance",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
