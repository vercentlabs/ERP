export const forecastingOutboundAdapter = {
  name: "sales/forecasting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/forecasting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
