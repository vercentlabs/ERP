export const installedAppsWebhookAdapter = {
  name: "integration-marketplace/installed-apps.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/installed-apps",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
