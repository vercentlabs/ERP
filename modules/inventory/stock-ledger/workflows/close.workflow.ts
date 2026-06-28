export const stockLedgerCloseWorkflow = {
  module: "inventory/stock-ledger",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/stock-ledger record ${recordId}`;
  },
};
