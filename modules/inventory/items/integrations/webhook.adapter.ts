export const itemsWebhookAdapter = {
  name: "inventory/items.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/items",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
