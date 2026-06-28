export const stockLedgerWebhookAdapter = {
  name: "inventory/stock-ledger.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-ledger",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
