export const customer360InboundAdapter = {
  name: "crm/customer-360.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/customer-360",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
