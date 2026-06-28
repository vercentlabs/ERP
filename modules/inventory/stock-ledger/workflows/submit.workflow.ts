export const stockLedgerSubmitWorkflow = {
  module: "inventory/stock-ledger",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/stock-ledger record ${recordId}`;
  },
};
