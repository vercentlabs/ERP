export const varianceAnalysisOutboundAdapter = {
  name: "enterprise-performance/variance-analysis.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/variance-analysis",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
