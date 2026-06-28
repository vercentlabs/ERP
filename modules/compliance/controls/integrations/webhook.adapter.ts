export const controlsWebhookAdapter = {
  name: "compliance/controls.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/controls",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
