export const stockAdjustmentsWebhookAdapter = {
  name: "inventory/stock-adjustments.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-adjustments",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
