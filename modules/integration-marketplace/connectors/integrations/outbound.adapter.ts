export const connectorsOutboundAdapter = {
  name: "integration-marketplace/connectors.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/connectors",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
