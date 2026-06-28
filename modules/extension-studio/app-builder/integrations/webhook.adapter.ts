export const appBuilderWebhookAdapter = {
  name: "extension-studio/app-builder.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/app-builder",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
