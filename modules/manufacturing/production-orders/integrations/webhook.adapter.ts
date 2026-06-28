export const productionOrdersWebhookAdapter = {
  name: "manufacturing/production-orders.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/production-orders",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
