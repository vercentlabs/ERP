export const taxesWebhookAdapter = {
  name: "finance/taxes.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/taxes",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
