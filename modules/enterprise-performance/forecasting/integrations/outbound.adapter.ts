export const forecastingOutboundAdapter = {
  name: "enterprise-performance/forecasting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/forecasting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
