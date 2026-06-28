export const installedAppsOutboundAdapter = {
  name: "integration-marketplace/installed-apps.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/installed-apps",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
