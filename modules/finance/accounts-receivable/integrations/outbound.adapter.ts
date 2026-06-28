export const accountsReceivableOutboundAdapter = {
  name: "finance/accounts-receivable.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/accounts-receivable",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
