export const engineeringChangeOrdersWebhookAdapter = {
  name: "product-lifecycle/engineering-change-orders.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/engineering-change-orders",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
