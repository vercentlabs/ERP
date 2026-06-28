export const manufacturingAnalyticsInboundAdapter = {
  name: "manufacturing/manufacturing-analytics.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/manufacturing-analytics",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
