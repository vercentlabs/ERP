export const customFieldsWebhookAdapter = {
  name: "platform/custom-fields.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/custom-fields",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
