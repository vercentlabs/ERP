export const erpAssistantWebhookAdapter = {
  name: "ai/erp-assistant.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/erp-assistant",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
