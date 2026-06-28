export const deferredRevenueWebhookAdapter = {
  name: "finance/deferred-revenue.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/deferred-revenue",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
