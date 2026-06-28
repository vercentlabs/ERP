export const cashFlowForecastingOutboundAdapter = {
  name: "ai/cash-flow-forecasting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/cash-flow-forecasting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
