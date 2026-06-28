export const operationalDataStoreOutboundAdapter = {
  name: "data-platform/operational-data-store.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/operational-data-store",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
