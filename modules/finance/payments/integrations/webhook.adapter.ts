export const paymentsWebhookAdapter = {
  name: "finance/payments.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/payments",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
