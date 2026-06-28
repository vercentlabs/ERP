export const installedAppsInboundAdapter = {
  name: "integration-marketplace/installed-apps.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/installed-apps",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
