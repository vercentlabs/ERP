export const leadsInboundAdapter = {
  name: "crm/leads.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/leads",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
