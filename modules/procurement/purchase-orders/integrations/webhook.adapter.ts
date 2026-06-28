export const purchaseOrdersWebhookAdapter = {
  name: "procurement/purchase-orders.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-orders",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
