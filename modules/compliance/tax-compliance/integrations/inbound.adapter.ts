export const taxComplianceInboundAdapter = {
  name: "compliance/tax-compliance.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/tax-compliance",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
