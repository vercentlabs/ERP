export const accountsReceivableInboundAdapter = {
  name: "finance/accounts-receivable.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/accounts-receivable",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
