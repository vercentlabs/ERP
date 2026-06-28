export const apiKeysOutboundAdapter = {
  name: "integration-marketplace/api-keys.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/api-keys",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
