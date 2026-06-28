export const currencyMasterWebhookAdapter = {
  name: "master-data/currency-master.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/currency-master",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
