export const couponsWebhookAdapter = {
  name: "commerce/coupons.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/coupons",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
