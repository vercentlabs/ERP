export const managementReportingOutboundAdapter = {
  name: "enterprise-performance/management-reporting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/management-reporting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
