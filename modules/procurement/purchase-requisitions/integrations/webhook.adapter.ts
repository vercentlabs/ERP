export const purchaseRequisitionsWebhookAdapter = {
  name: "procurement/purchase-requisitions.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-requisitions",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
