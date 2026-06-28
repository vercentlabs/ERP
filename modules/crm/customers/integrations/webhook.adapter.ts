export const customersWebhookAdapter = {
  name: "crm/customers.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/customers",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
