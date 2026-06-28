export const operationalDataStoreWebhookAdapter = {
  name: "data-platform/operational-data-store.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/operational-data-store",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
