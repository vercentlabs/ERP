export const checkoutWebhookAdapter = {
  name: "commerce/checkout.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/checkout",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
