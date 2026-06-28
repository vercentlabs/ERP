export const freightRatesInboundAdapter = {
  name: "logistics/freight-rates.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/freight-rates",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
