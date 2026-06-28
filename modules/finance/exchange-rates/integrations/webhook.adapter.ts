export const exchangeRatesWebhookAdapter = {
  name: "finance/exchange-rates.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/exchange-rates",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
