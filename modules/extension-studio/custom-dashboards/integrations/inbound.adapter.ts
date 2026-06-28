export const customDashboardsInboundAdapter = {
  name: "extension-studio/custom-dashboards.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-dashboards",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
