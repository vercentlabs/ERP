export const policyManagementOutboundAdapter = {
  name: "risk-management/policy-management.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/policy-management",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
