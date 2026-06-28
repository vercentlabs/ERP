export const partiesInboundAdapter = {
  name: "master-data/parties.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/parties",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
