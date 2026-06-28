export const purchaseContractsWebhookAdapter = {
  name: "procurement/purchase-contracts.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-contracts",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
