export const customersWebhookAdapter = {
  name: "master-data/customers.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/customers",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
