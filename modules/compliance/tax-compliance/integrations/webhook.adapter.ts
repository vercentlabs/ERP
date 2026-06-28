export const taxComplianceWebhookAdapter = {
  name: "compliance/tax-compliance.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/tax-compliance",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
