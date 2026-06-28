export const locationsWebhookAdapter = {
  name: "master-data/locations.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/locations",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
