export const sustainabilityReportsInboundAdapter = {
  name: "sustainability/sustainability-reports.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/sustainability-reports",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
