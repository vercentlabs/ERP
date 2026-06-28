export const oauthConnectionsOutboundAdapter = {
  name: "integration-marketplace/oauth-connections.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/oauth-connections",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
