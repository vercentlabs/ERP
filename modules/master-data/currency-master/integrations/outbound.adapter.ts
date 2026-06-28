export const currencyMasterOutboundAdapter = {
  name: "master-data/currency-master.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/currency-master",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
