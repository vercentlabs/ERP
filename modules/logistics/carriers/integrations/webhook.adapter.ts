export const carriersWebhookAdapter = {
  name: "logistics/carriers.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/carriers",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
