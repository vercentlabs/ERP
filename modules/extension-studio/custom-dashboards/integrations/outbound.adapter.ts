export const customDashboardsOutboundAdapter = {
  name: "extension-studio/custom-dashboards.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-dashboards",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
