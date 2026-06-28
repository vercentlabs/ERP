export const biConnectorsOutboundAdapter = {
  name: "data-platform/bi-connectors.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/bi-connectors",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
