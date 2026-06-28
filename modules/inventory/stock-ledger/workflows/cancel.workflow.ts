export const stockLedgerCancelWorkflow = {
  module: "inventory/stock-ledger",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/stock-ledger record ${recordId}`;
  },
};
