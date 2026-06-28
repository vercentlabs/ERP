export const forecastingWebhookAdapter = {
  name: "sales/forecasting.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/forecasting",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
