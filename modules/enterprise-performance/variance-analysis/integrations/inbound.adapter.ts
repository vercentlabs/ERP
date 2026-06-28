export const varianceAnalysisInboundAdapter = {
  name: "enterprise-performance/variance-analysis.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/variance-analysis",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
