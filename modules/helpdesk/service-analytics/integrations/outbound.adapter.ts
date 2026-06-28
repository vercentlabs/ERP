export const serviceAnalyticsOutboundAdapter = {
  name: "helpdesk/service-analytics.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/service-analytics",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
