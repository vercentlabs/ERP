export const supplierSustainabilityWebhookAdapter = {
  name: "sustainability/supplier-sustainability.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/supplier-sustainability",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
