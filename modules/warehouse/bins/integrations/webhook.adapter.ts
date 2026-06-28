export const binsWebhookAdapter = {
  name: "warehouse/bins.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/bins",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
