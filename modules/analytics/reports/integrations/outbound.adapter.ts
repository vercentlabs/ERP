export const reportsOutboundAdapter = {
  name: "analytics/reports.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/reports",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
