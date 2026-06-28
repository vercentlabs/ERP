export const biConnectorsInboundAdapter = {
  name: "data-platform/bi-connectors.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/bi-connectors",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
