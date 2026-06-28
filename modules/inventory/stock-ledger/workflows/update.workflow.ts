export const stockLedgerUpdateWorkflow = {
  module: "inventory/stock-ledger",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/stock-ledger record ${recordId}`;
  },
};
