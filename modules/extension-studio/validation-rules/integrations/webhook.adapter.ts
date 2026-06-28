export const validationRulesWebhookAdapter = {
  name: "extension-studio/validation-rules.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/validation-rules",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
