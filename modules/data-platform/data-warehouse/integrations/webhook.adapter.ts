export const dataWarehouseWebhookAdapter = {
  name: "data-platform/data-warehouse.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/data-warehouse",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
