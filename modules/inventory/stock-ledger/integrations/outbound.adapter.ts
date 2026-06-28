export const stockLedgerOutboundAdapter = {
  name: "inventory/stock-ledger.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-ledger",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
