export const embeddedAnalyticsInboundAdapter = {
  name: "analytics/embedded-analytics.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/embedded-analytics",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
