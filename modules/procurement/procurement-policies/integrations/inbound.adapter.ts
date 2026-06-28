export const procurementPoliciesInboundAdapter = {
  name: "procurement/procurement-policies.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/procurement-policies",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
