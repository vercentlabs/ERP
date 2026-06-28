export const supplierQualityWebhookAdapter = {
  name: "quality/supplier-quality.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/supplier-quality",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
