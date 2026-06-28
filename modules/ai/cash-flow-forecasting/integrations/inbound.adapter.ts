export const cashFlowForecastingInboundAdapter = {
  name: "ai/cash-flow-forecasting.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/cash-flow-forecasting",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
