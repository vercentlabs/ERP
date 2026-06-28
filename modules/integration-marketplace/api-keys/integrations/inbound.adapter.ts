export const apiKeysInboundAdapter = {
  name: "integration-marketplace/api-keys.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/api-keys",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
