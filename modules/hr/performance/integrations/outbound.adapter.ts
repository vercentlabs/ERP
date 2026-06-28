export const performanceOutboundAdapter = {
  name: "hr/performance.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/performance",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
