export const stockBalancesWebhookAdapter = {
  name: "inventory/stock-balances.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-balances",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
