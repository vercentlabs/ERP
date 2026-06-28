export const quotationsWebhookAdapter = {
  name: "sales/quotations.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/quotations",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
