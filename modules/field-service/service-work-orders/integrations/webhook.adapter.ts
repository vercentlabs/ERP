export const serviceWorkOrdersWebhookAdapter = {
  name: "field-service/service-work-orders.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/service-work-orders",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
