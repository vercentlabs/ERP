export const manufacturingAnalyticsWebhookAdapter = {
  name: "manufacturing/manufacturing-analytics.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/manufacturing-analytics",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
