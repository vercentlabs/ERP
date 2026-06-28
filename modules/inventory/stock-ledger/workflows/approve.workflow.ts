export const stockLedgerApproveWorkflow = {
  module: "inventory/stock-ledger",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/stock-ledger record ${recordId}`;
  },
};
