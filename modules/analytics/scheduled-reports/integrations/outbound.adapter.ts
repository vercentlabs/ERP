export const scheduledReportsOutboundAdapter = {
  name: "analytics/scheduled-reports.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/scheduled-reports",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
