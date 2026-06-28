export const certificationsWebhookAdapter = {
  name: "compliance/certifications.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/certifications",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
