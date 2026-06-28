export const meteredUsageWebhookAdapter = {
  name: "subscriptions/metered-usage.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/metered-usage",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
