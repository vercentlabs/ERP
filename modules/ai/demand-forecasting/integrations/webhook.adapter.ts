export const demandForecastingWebhookAdapter = {
  name: "ai/demand-forecasting.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/demand-forecasting",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
