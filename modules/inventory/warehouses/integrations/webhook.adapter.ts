export const warehousesWebhookAdapter = {
  name: "inventory/warehouses.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/warehouses",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
