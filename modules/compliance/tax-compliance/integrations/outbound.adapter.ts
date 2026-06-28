export const taxComplianceOutboundAdapter = {
  name: "compliance/tax-compliance.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/tax-compliance",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
