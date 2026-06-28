export const operationalDataStoreInboundAdapter = {
  name: "data-platform/operational-data-store.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/operational-data-store",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
