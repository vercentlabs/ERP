export const procurementPoliciesOutboundAdapter = {
  name: "procurement/procurement-policies.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/procurement-policies",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
