export const bankReconciliationWebhookAdapter = {
  name: "finance/bank-reconciliation.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/bank-reconciliation",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
