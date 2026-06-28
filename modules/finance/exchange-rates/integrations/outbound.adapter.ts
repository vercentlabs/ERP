export const exchangeRatesOutboundAdapter = {
  name: "finance/exchange-rates.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/exchange-rates",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
