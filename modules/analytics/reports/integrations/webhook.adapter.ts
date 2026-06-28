export const reportsWebhookAdapter = {
  name: "analytics/reports.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/reports",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
