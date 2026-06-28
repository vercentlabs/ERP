export const sustainabilityReportsOutboundAdapter = {
  name: "sustainability/sustainability-reports.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/sustainability-reports",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
