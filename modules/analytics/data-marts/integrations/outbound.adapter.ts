export const dataMartsOutboundAdapter = {
  name: "analytics/data-marts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/data-marts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
