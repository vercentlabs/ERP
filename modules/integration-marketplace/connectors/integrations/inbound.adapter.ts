export const connectorsInboundAdapter = {
  name: "integration-marketplace/connectors.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/connectors",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
