export const oauthConnectionsInboundAdapter = {
  name: "integration-marketplace/oauth-connections.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/oauth-connections",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
