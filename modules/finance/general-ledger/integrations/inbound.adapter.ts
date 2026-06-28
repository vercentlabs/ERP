export const generalLedgerInboundAdapter = {
  name: "finance/general-ledger.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/general-ledger",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
