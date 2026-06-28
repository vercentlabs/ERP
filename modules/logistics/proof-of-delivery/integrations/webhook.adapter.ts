export const proofOfDeliveryWebhookAdapter = {
  name: "logistics/proof-of-delivery.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/proof-of-delivery",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
