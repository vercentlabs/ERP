export const complianceDocumentsWebhookAdapter = {
  name: "product-lifecycle/compliance-documents.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/compliance-documents",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
