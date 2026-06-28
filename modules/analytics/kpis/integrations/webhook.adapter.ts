export const kpisWebhookAdapter = {
  name: "analytics/kpis.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/kpis",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
