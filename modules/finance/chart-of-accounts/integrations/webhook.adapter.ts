export const chartOfAccountsWebhookAdapter = {
  name: "finance/chart-of-accounts.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/chart-of-accounts",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
