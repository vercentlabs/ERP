export const procurementPoliciesWebhookAdapter = {
  name: "procurement/procurement-policies.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/procurement-policies",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
