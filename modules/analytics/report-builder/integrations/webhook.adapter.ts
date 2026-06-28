export const reportBuilderWebhookAdapter = {
  name: "analytics/report-builder.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/report-builder",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
