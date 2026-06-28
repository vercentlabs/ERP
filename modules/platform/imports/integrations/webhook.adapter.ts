export const importsWebhookAdapter = {
  name: "platform/imports.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/imports",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
