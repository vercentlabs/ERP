export const mobileScanningWebhookAdapter = {
  name: "warehouse/mobile-scanning.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/mobile-scanning",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
