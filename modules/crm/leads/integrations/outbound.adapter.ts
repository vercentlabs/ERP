export const leadsOutboundAdapter = {
  name: "crm/leads.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/leads",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
