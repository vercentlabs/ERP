export const kpisOutboundAdapter = {
  name: "analytics/kpis.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/kpis",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
