export const taxMasterInboundAdapter = {
  name: "master-data/tax-master.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/tax-master",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
