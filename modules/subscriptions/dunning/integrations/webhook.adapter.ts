export const dunningWebhookAdapter = {
  name: "subscriptions/dunning.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/dunning",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
