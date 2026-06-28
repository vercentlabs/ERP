export const campaignsInboundAdapter = {
  name: "crm/campaigns.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/campaigns",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
