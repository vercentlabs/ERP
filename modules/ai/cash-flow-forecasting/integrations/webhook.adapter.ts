export const cashFlowForecastingWebhookAdapter = {
  name: "ai/cash-flow-forecasting.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/cash-flow-forecasting",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
