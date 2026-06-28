export const customer360OutboundAdapter = {
  name: "crm/customer-360.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/customer-360",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
