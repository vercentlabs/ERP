export const mpsWebhookAdapter = {
  name: "manufacturing/mps.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/mps",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
