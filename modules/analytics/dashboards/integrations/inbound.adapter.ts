export const dashboardsInboundAdapter = {
  name: "analytics/dashboards.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/dashboards",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
