export const fixedAssetsWebhookAdapter = {
  name: "finance/fixed-assets.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/fixed-assets",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
