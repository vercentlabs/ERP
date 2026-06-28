export const serviceAnalyticsInboundAdapter = {
  name: "helpdesk/service-analytics.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/service-analytics",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
