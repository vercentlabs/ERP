export const reportsInboundAdapter = {
  name: "analytics/reports.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/reports",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
