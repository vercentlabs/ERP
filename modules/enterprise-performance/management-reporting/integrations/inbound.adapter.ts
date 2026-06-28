export const managementReportingInboundAdapter = {
  name: "enterprise-performance/management-reporting.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/management-reporting",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
