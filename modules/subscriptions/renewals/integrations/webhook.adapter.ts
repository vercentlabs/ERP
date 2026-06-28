export const renewalsWebhookAdapter = {
  name: "subscriptions/renewals.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/renewals",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
