export const itemsWebhookAdapter = {
  name: "master-data/items.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/items",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
