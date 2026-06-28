export const carbonAccountingWebhookAdapter = {
  name: "sustainability/carbon-accounting.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/carbon-accounting",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
