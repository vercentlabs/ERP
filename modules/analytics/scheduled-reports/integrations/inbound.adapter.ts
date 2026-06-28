export const scheduledReportsInboundAdapter = {
  name: "analytics/scheduled-reports.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/scheduled-reports",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
