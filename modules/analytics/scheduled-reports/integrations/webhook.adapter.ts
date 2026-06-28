export const scheduledReportsWebhookAdapter = {
  name: "analytics/scheduled-reports.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/scheduled-reports",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
