export const commerceOrdersWebhookAdapter = {
  name: "commerce/commerce-orders.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/commerce-orders",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
