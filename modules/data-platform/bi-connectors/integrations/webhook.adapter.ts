export const biConnectorsWebhookAdapter = {
  name: "data-platform/bi-connectors.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/bi-connectors",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
