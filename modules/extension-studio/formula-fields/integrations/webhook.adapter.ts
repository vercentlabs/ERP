export const formulaFieldsWebhookAdapter = {
  name: "extension-studio/formula-fields.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/formula-fields",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
