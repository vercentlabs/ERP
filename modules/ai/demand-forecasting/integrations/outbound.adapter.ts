export const demandForecastingOutboundAdapter = {
  name: "ai/demand-forecasting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/demand-forecasting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
