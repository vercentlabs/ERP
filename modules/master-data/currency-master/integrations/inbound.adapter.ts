export const currencyMasterInboundAdapter = {
  name: "master-data/currency-master.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/currency-master",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
