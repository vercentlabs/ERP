export const accountsReceivableWebhookAdapter = {
  name: "finance/accounts-receivable.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/accounts-receivable",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
