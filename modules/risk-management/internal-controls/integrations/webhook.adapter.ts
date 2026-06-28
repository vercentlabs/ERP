export const internalControlsWebhookAdapter = {
  name: "risk-management/internal-controls.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/internal-controls",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
