export const uomMasterOutboundAdapter = {
  name: "master-data/uom-master.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/uom-master",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
