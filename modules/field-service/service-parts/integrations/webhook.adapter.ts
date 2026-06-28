export const servicePartsWebhookAdapter = {
  name: "field-service/service-parts.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/service-parts",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
