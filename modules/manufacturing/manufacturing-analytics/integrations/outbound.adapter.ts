export const manufacturingAnalyticsOutboundAdapter = {
  name: "manufacturing/manufacturing-analytics.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/manufacturing-analytics",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
