export const customer360WebhookAdapter = {
  name: "crm/customer-360.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/customer-360",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
