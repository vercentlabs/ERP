export const customPagesWebhookAdapter = {
  name: "extension-studio/custom-pages.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-pages",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
