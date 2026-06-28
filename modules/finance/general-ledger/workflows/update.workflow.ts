export const generalLedgerUpdateWorkflow = {
  module: "finance/general-ledger",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/general-ledger record ${recordId}`;
  },
};
