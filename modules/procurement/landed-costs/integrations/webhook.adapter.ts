export const landedCostsWebhookAdapter = {
  name: "procurement/landed-costs.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/landed-costs",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
