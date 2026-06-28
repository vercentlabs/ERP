export const stockLedgerCreateWorkflow = {
  module: "inventory/stock-ledger",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/stock-ledger record ${recordId}`;
  },
};
