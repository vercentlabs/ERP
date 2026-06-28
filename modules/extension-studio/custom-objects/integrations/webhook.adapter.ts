export const customObjectsWebhookAdapter = {
  name: "extension-studio/custom-objects.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-objects",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
