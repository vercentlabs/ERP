export const stockLedgerRejectWorkflow = {
  module: "inventory/stock-ledger",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/stock-ledger record ${recordId}`;
  },
};
