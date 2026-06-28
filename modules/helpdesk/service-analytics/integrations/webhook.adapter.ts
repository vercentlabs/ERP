export const serviceAnalyticsWebhookAdapter = {
  name: "helpdesk/service-analytics.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/service-analytics",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
