export const embeddedAnalyticsOutboundAdapter = {
  name: "analytics/embedded-analytics.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/embedded-analytics",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
