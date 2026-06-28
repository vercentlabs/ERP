export const assetsWebhookAdapter = {
  name: "maintenance/assets.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/assets",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
