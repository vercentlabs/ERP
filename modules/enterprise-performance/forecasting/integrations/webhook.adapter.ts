export const forecastingWebhookAdapter = {
  name: "enterprise-performance/forecasting.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/forecasting",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
