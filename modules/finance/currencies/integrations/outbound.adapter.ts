export const currenciesOutboundAdapter = {
  name: "finance/currencies.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/currencies",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
