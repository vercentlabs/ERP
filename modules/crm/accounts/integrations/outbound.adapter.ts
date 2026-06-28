export const accountsOutboundAdapter = {
  name: "crm/accounts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/accounts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
