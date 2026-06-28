export const publicApiOutboundAdapter = {
  name: "integration-marketplace/public-api.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/public-api",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
