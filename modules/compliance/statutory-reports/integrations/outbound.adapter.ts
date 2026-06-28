export const statutoryReportsOutboundAdapter = {
  name: "compliance/statutory-reports.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/statutory-reports",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
