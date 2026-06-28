export const embeddedAnalyticsWebhookAdapter = {
  name: "analytics/embedded-analytics.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/embedded-analytics",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
