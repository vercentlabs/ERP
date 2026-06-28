export const generalLedgerCancelWorkflow = {
  module: "finance/general-ledger",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/general-ledger record ${recordId}`;
  },
};
